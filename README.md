# r-script

A simple little module for passing data from NodeJS to R (and back again).

Data passed from node is converted into a list and loaded into the R environment as the variable `input`. No special syntax in R is needed. For better portability/reliability, it's recommended to load packages with [`needs`](https://github.com/joshkatz/needs) (comes packaged inside the module — no installation required).

### Installation

```
npm install @maki-people/r-script
```

### How to use

`npx ts-node example/ex.ts`

```typescript
// [ { group: '(40,55]', rating: 46.7143, advance: 41.1429 },
//   { group: '(55,70]', rating: 64.6154, advance: 41.9231 },
//   { group: '(70,85]', rating: 77.2, advance: 45.5 } ]
```

### Test

`npm run test`

### Syntax

**R**(_path_)

Creates an instance of the R class that will source the R script specified by _path_.

R.**data**(...)

Adds data to the object. You can give any number of arguments of different types.

R.**execute**(_timeout_)

Calls R. Any previously supplied _data_ is stringified into JSON and passed to R, where it's converted into a list and loaded into the R environment as the variable `input`.
The promise resolves the R script output or reject any error.
If any timeout in ms is provided, the R script process will be killed after the timeout delay.
