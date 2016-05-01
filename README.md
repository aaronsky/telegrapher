# telegrapher

A command-line tool for communicating between Arduino using morse code!

## Setup

```
npm install -g telegrapher
```

To run an Arduino board with telegrapher, it must be a compatible board with [Johnny-Five](http://johnny-five.io/) and it must be set up with the latest version of StandardFirmata. Follow the instructions on the johnny-five [Getting Started](https://github.com/rwaldron/johnny-five/wiki/Getting-Started) page and follow the [Troubleshooting](https://github.com/rwaldron/johnny-five/wiki/Getting-Started#trouble-shooting) page if problems arise.

telegrapher is designed to work with these schematics:

{placeholder}

## Usage

On your server, run the following:

```
telegrapher server
```

By default telegrapher will run on port 9000, but it will take preference to a manually set port, or a NODE_PORT environment variable. If you want to manually set a port, try:

```
telegrapher server -p <PORT>
```

---

On your client, run the following:

```
telegrapher client -a <SERVER ADDRESS>
```

When setting up your client, you can opt to define a user name using:

```
telegrapher client -a <SERVER ADDRESS> -n <A NAME>
```
