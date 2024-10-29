# WDX - WS - Client - JS - Examples - C++ Integration

C++ projects integration example with a WDX - WS - Client - JS package.


## Table of Contents

- [Requirements](#requirements)
- [Example](#examplec++-wdx-project)
- [Step By Step Guide](#step-by-step-guide)
- [Usage](#usage)
  - [Using Client](#using-client)
- [API](https://github.com/elrest-cz/wdx-ws-client-js/blob/master/docs/modules.md)
- [License](#license)



## Requirements

+ nodejs version 18.18.2 or higher is required.
+ python version 3 or higher is required.
+ pip version 22.17.0 or higher is required.


## Example

See example C++ project in the [example](https://github.com/elrest-cz/wdx-ws-client-js/blob/master/examples) directory.

## Step by Step Guide


### Create a project directory

Create a new directory for your project:

```bash
mkdir c++-wdx
```

and navigate to it in your terminal

```bash
cd c++-wdx
```


### Initialize a new NodeJS project

Initialize a new Node.js project using npm or yarn:

```bash
npm init
```

or

```bash
yarn init
```


### Install WDX - WS - Client - JS Package

To install the WDX - WS - Client - JS package, use npm or yarn:

```bash
npm install @wago/wdx-ws-client-js
```

or

```bash
yarn add @wago/wdx-ws-client-js
```


### Create WDX - IoT Data connection

WDX will provide IoT data and we will be able to communicate IoT device within this example to use in your C++ project.

In these example we will use WDX Data Virtual Store instance to simulate WDX IoT data in SQLite tree database.

//create instance



### Create WDX - IoT Data Schema

//create schema
    //test-input
    //test-output


// subscribe test-input value

    // call napi call c++ function
    // update value test-output