pipeline {
  agent any
  tools {
    nodejs 'NodeJS' // Name of the Node.js Installation in Global Tools 
  }
  stages ('Checkout'){
    steps{
      git url: 'https://github.com/sankalpmax/Bank-Transaction-Application.git', branch 'main'
    }
  }
  
