# A Food API Project

It comes preconfigured with commonly used dependencies and uses `nodemon` for development. You can later integrate it with `PM2` if needed.

Feel free to use, share, and contribute. Your contributions—whether bug reports, feature suggestions, or code—are always welcome!

Let’s make this project better together! 🚀

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (Tested with version 18.2.0, latest LTS recommended)
- [MongoDB](https://www.mongodb.com/) (If using a local database)
- [Nodemon](https://www.npmjs.com/package/nodemon) (Installed globally or via `npm install`)
- [create-node-component](https://www.npmjs.com/package/create-node-component) (Optional, for scaffolding components)

## Installation

1. Clone this repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Project

### Development Mode

To run the project with `nodemon` (auto-restarts on file changes):
```sh
npm start
```

### Production Mode (Optional: Using PM2)

If you want to use `PM2` for process management:
```sh
npm install -g pm2
npm run build # If needed
pm2 start server.js --name "my-api"
```

## Configuration

### Environment Variables

The project reads environment variables from `nodemon.json`. Below are the key variables you might need to configure:

```sh
cp nodemon.json.sample nodemon.json
```

```sh
ENVIRONMENT=DEVELOPMENT
DEFAULT_PORT=3001
MONGO_USER=yourMongoUser
MONGO_PASSWORD=yourMongoPassword
MONGO_SERVER=yourMongoServer
MONGO_DB=yourDatabaseName
JWT_KEY=yourJWTKey
```

Ensure all required variables are set before starting the project.

## Folder Structure

```
nodemon.json
package.json
app.js
db.js
server.js
src/
- helpers/
- middlewares/
- modules/
--- home/
---- controllers/
---- models/
---- routes/
---- services/
- views/
```

## Package.json Overview

The `package.json` includes the following:

### Key Dependencies:
- `express` - Web framework for building APIs.
- `mongoose` - MongoDB ODM for data modeling.
- `jsonwebtoken` - JWT-based authentication.
- `bcrypt` - Password hashing.
- `cors` - Cross-origin request handling.
- `dotenv` - Environment variable management.
- `winston` - Logging utility.

### Development Tools:
- `nodemon` - Auto-restart server on file changes.
- `morgan` - HTTP request logging.
- `multer` - File upload handling.

### Utilities:
- `lodash`, `moment`, `moment-timezone` - Data manipulation.
- `socket.io` - Real-time communication support.

## License

This project is licensed under the MIT License.

