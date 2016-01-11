# Example Socket.IO Application

Simple example application demonstrating how Socket.IO can be used for real-time editing between multiple clients.

Based loosely on the todo application in the [ReactJS documentation](http://facebook.github.io/react/#todoExample).

## Development

### Dependencies

From the root directory of the project:

```bash
# global requirements
brew install ansible
brew install nodejs
brew install npm
npm install -g browserify
npm install -g nodemon

# local requirements
npm install
```

See the [React documentation](http://facebook.github.io/react/docs/getting-started.html#using-react-from-npm) for further notes on installation.

### Building

From the root directory of the project:

```bash
scripts/example build
```

### Running

To run the project locally for testing, you can run the development server using the following command:

```bash
scripts/example serve
```

This simply runs the `build/service.js` file under `nodemon`. Since this uses `nodemon`, the service will be loaded when the project is rebuilt using `scripts/example build`.

#### Ansible

Deployment is performed using Ansible which can be configured in the `ansible` directory.

From the root directory of the project:

```bash
scripts/example deploy
```

The application currently makes use of upstart to configure Node.js as a service on Ubuntu systems as described in [this article](http://kvz.io/blog/2009/12/15/run-nodejs-as-a-service-on-ubuntu-karmic/).
