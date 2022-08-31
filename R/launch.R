source(file.path(Sys.getenv("DIRNAME"), "needs.R"))
needs(jsonlite)

run <- function(data_in) {

  # set up environment
  input <- unname(data_in[[1]])
  .e <- as.environment(list(
    path = data_in[[2]],
    out = modifyList(list(x = NULL, auto_unbox = TRUE),
      data_in[[3]],
      keep.null = TRUE
    )
  ))
  lockBinding(".e", environment())

  # run source, capture output
  captured <- tryCatch(capture.output({
    temp <- source(.e$path, local = TRUE)$value
  }), error = function(err) err)
  unlockBinding(".e", environment())

  # process and return
  if (inherits(captured, "error")) {
    msg <- conditionMessage(captured)
    cat("Error in R script", .e$path, "\n", sQuote(msg), file = stderr())
    return(invisible(F))
  }
  .e$out$x <- if (is.null(temp)) {
    ""
  } else {
    temp
  }
  do.call(toJSON, .e$out)
}

suppressWarnings(
  run(fromJSON(Sys.getenv("input")))
)
