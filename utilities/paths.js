const path = require('path');

// Parent folder = project root
const root = path.join(__dirname, '..');

export default {
    // Root project folder.  This is the current dir.
    root,

    // Source path; where we'll put our application files
    src: path.join(root, 'src'),

    // Library path; where we'll reusable application files
    lib: path.join(root, 'library'),

    // Cient path; where we'll put our client application files
    client: path.join(root, 'src', 'client'),

    // Cient path; where we'll put our client application files
    server: path.join(root, 'src', 'server'),

    // Static files.  HTML, images, etc that can be processed by Webpack
    // before being moved into the final `dist` folder
    static: path.join(root, 'static'),

    // Dist path; where bundled assets will wind up
    entry: path.join(root, 'entry'),

      // Webpack configuration files
    webpack: path.join(root, 'webpack'),

    // Dist path; where bundled assets will wind up
    dist: path.join(root, 'dist'),

    // Dist path for development; where dev assets will wind up
    distDev: path.resolve(root, 'dist/dev'),

    // Public.  This is where our web server will start looking to serve
    // static files from
    // public: path.join(root, 'dist', 'public')

    public: path.resolve(root, 'dist/public')
};
