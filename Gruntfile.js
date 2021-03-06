/**
 * Gruntfile
 *
 * If you created your Sails app with `sails new foo --linker`,
 * the following files will be automatically injected (in order)
 * into the EJS and HTML files in your `views` and `assets` folders.
 *
 * At the top part of this file, you'll find a few of the most commonly
 * configured options, but Sails' integration with Grunt is also fully
 * customizable.  If you'd like to work with your assets differently
 * you can change this file to do anything you like!
 *
 * More information on using Grunt to work with static assets:
 * http://gruntjs.com/configuring-tasks
 */

module.exports = function (grunt) {

  /**
   * CSS files to inject in order
   * (uses Grunt-style wildcard/glob/splat expressions)
   *
   * By default, Sails also supports LESS in development and production.
   * To use SASS/SCSS, Stylus, etc., edit the `sails-linker:devStyles` task
   * below for more options.  For this to work, you may need to install new
   * dependencies, e.g. `npm install grunt-contrib-sass`
   */

  var cssFilesToInject = [
    'linker/lib/**/*.css',
    'linker/**/*.css'
  ];

  /**
   * Javascript files to inject in order
   * (uses Grunt-style wildcard/glob/splat expressions)
   *
   * To use client-side CoffeeScript, TypeScript, etc., edit the
   * `sails-linker:devJs` task below for more options.
   */
  var jsCommon = [
    // Below, as a demonstration, you'll see the built-in dependencies
    // linked in the proper order order

    // Bring in the socket.io client
    'linker/js/dependencies/socket.io.js',

    // then beef it up with some convenience logic for talking to Sails.js
    'linker/js/dependencies/sails.io.js',

    // A simpler boilerplate library for getting you up and running w/ an
    // automatic listener for incoming messages from Socket.io.
    'linker/js/dependencies/app.js',

    'linker/js/dependencies/lib/jquery*.js',
    // Add underscore before others
    'linker/js/dependencies/lib/underscore*.js',
    // Add external libraries before any other files
    'linker/js/dependencies/lib/*.js',

    'linker/js/dependencies/*.js'
  ];
  var jsFilesToInject = [
    // Backbone  user
    'linker/js/user/**/*.js',

    'linker/js/routes/user/routes.js',
    // except handlebars, this will be included in template section
    '!linker/js/dependencies/**/handlebars*.js'
  ];
  var jsFilesToInjectAdmin = [
    // Backbone  admin
    'linker/js/admin/**/*.js',
    'linker/js/routes/admin/routes.js',
    '!linker/js/dependencies/**/handlebars*.js'
  ];
  jsFilesToInject = jsCommon.concat(jsFilesToInject);
  jsFilesToInjectAdmin = jsCommon.concat(jsFilesToInjectAdmin);

  /**
   * Client-side HTML templates are injected using the sources below
   * The ordering of these templates shouldn't matter.
   * (uses Grunt-style wildcard/glob/splat expressions)
   *
   * By default, Sails uses JST templates and precompiles them into
   * functions for you.  If you want to use jade, handlebars, dust, etc.,
   * edit the relevant sections below.
   */

  var templateFilesToCompile = [
    'linker/**/*.html',
    'linker/**/*.hbs',
    'linker/**/*.handlebars'
  ];

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  //
  // DANGER:
  //
  // With great power comes great responsibility.
  //
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  // Modify css file injection paths to use 
  cssFilesToInject = cssFilesToInject.map(function (path) {
    return '.tmp/public/' + path;
  });

  // Modify js file injection paths to use 
  jsFilesToInject = jsFilesToInject.map(function (path) {
    if (path.match(/^!/))
      return '!.tmp/public/' + path.substring(1);
    else
      return '.tmp/public/' + path;
  });
  jsFilesToInjectAdmin = jsFilesToInjectAdmin.map(function (path) {
    if (path.match(/^!/))
      return '!.tmp/public/' + path.substring(1);
    else
      return '.tmp/public/' + path;
  });

  productionJsFilesToInject = jsFilesToInject;
  productionJsFilesToInject.unshift('.tmp/public/linker/**/handlebars*.js', '.tmp/public/templates.js');
  //remove handlebars ignorance
  productionJsFilesToInject.pop();
  templateFilesToCompile = templateFilesToCompile.map(function (path) {
    return '.tmp/public/' + path;
  });

  // Get path to core grunt dependencies from Sails
  var depsPath = grunt.option('gdsrc') || 'node_modules/sails/node_modules';
  grunt.loadTasks(depsPath + '/grunt-contrib-clean/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-copy/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-concat/tasks');
  grunt.loadTasks(depsPath + '/grunt-sails-linker/tasks');
  grunt.loadTasks('./node_modules/grunt-contrib-handlebars/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-watch/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-uglify/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-cssmin/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-less/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-coffee/tasks');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: './assets',
            src: ['**/*.!(coffee)'],
            dest: '.tmp/public'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: './assets',
            src: ['**/*.!(coffee)', '!**/fonts/**', '!**/img/**', '!**/lib/images/**'],
            dest: '.tmp/public'
          },
          {
            expand: true,
            cwd: './assets/linker/styles',
            src: ['fonts/**', 'img/**'],
            dest: '.tmp/public/min'
          }
        ]
      },
      build: {
        files: [
          {
            expand: true,
            cwd: '.tmp/public',
            src: ['**/*'],
            dest: 'www'
          }
        ]
      }
    },

    clean: {
      dev: ['.tmp/public/**'],
      build: ['www']
    },

    handlebars: {
      options: {
        namespace: 'Templates',
        processName: function (filePath) {
          return filePath.replace(/^\.tmp\/public\/linker\/templates\//, '').replace(/(\.html$|\.hbs$|\.handlebars$)/, '');
        }
      },
      dev: {
        files: {
          ".tmp/public/templates.js": templateFilesToCompile
        }
      }
    },

    less: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'assets/styles/',
            src: ['*.less'],
            dest: '.tmp/public/styles/',
            ext: '.css'
          },
          {
            expand: true,
            cwd: 'assets/linker/styles/',
            src: ['*.less'],
            dest: '.tmp/public/linker/styles/',
            ext: '.css'
          }
        ]
      }
    },

    coffee: {
      dev: {
        options: {
          bare: true
        },
        files: [
          {
            expand: true,
            cwd: 'assets/js/',
            src: ['**/*.coffee'],
            dest: '.tmp/public/js/',
            ext: '.js'
          },
          {
            expand: true,
            cwd: 'assets/linker/js/',
            src: ['**/*.coffee'],
            dest: '.tmp/public/linker/js/',
            ext: '.js'
          }
        ]
      }
    },

    concat: {
      js: {
        src: productionJsFilesToInject,
        dest: '.tmp/public/concat/production.js'
      },
      css: {
        src: cssFilesToInject,
        dest: '.tmp/public/concat/production.css'
      }
    },

    uglify: {
      dist: {
        src: ['.tmp/public/concat/production.js'],
        dest: '.tmp/public/min/production.js'
      }
    },

    cssmin: {
      dist: {
        src: ['.tmp/public/concat/production.css'],
        dest: '.tmp/public/min/production.css'
      }
    },

    'sails-linker': {

      devJs: {
        options: {
          startTag: '<!--SCRIPTS-->',
          endTag: '<!--SCRIPTS END-->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: '.tmp/public'
        },
        files: {
          '.tmp/public/**/*.html': jsFilesToInject,
          'views/**/*.html': jsFilesToInject,
          'views/**/user/*.handlebars': jsFilesToInject,
          'views/**/admin/*.handlebars': jsFilesToInjectAdmin,
          'views/**/*.hbs': jsFilesToInject
        }
      },

      prodJs: {
        options: {
          startTag: '<!--SCRIPTS-->',
          endTag: '<!--SCRIPTS END-->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: '.tmp/public'
        },
        files: {
          '.tmp/public/**/*.html': ['.tmp/public/min/production.js'],
          'views/**/*.html': ['.tmp/public/min/production.js'],
          'views/**/*.handlebars': ['.tmp/public/min/production.js'],
          'views/**/*.hbs': ['.tmp/public/min/production.js']
        }
      },

      devStyles: {
        options: {
          startTag: '<!--STYLES-->',
          endTag: '<!--STYLES END-->',
          fileTmpl: '<link rel="stylesheet" href="%s">',
          appRoot: '.tmp/public'
        },

        // cssFilesToInject defined up top
        files: {
          '.tmp/public/**/*.html': cssFilesToInject,
          'views/**/*.html': cssFilesToInject,
          'views/**/*.handlebars': cssFilesToInject,
          'views/**/*.hbs': cssFilesToInject
        }
      },

      prodStyles: {
        options: {
          startTag: '<!--STYLES-->',
          endTag: '<!--STYLES END-->',
          fileTmpl: '<link rel="stylesheet" href="%s">',
          appRoot: '.tmp/public'
        },
        files: {
          '.tmp/public/index.html': ['.tmp/public/min/production.css'],
          'views/**/*.html': ['.tmp/public/min/production.css'],
          'views/**/*.handlebars': ['.tmp/public/min/production.css'],
          'views/**/*.hbs': ['.tmp/public/min/production.css']
        }
      },

      // Bring in Templates object
      devTpl: {
        options: {
          startTag: '<!--TEMPLATES-->',
          endTag: '<!--TEMPLATES END-->',
          fileTmpl: '<script type="text/javascript" src="%s"></script>',
          appRoot: '.tmp/public'
        },
        files: {
          '.tmp/public/index.html': ['.tmp/public/linker/**/handlebars*.js', '.tmp/public/templates.js'],
          'views/**/*.html': ['.tmp/public/linker/**/handlebars*.js', '.tmp/public/templates.js'],
          'views/**/*.handlebars': ['.tmp/public/linker/**/handlebars*.js', '.tmp/public/templates.js'],
          'views/**/*.hbs': ['.tmp/public/linker/**/handlebars*.js', '.tmp/public/templates.js']
        }
      }
    },

    watch: {
      api: {

        // API files to watch:
        files: ['api/**/*']
      },
      assets: {

        // Assets to watch:
        files: ['assets/**/*'],

        // When assets are changed:
        tasks: ['compileAssets', 'linkAssets']
      }
    }
  });

  // When Sails is lifted:
  grunt.registerTask('default', [
    'compileAssets',
    'linkAssets',
    'watch',
  ]);

  grunt.registerTask('compileAssets', [
    'clean:dev',
    'less:dev',
    'copy:dev',
    'coffee:dev',
    'handlebars:dev'
  ]);

  grunt.registerTask('linkAssets', [

    // Update link/script/template references in `assets` index.html
    'sails-linker:devJs',
    'sails-linker:devStyles',
    'sails-linker:devTpl'
  ]);

  // Build the assets into a web accessible folder.
  // (handy for phone gap apps, chrome extensions, etc.)
  grunt.registerTask('build', [
    'compileAssets',
    'linkAssets',
    'clean:build',
    'copy:build'
  ]);

  // When sails is lifted in production
  grunt.registerTask('prod', [
    'clean:dev',
    'less:dev',
    'copy:prod',
    'handlebars:dev',
    'coffee:dev',
    'concat',
    'uglify',
    'cssmin',
    'sails-linker:prodJs',
    'sails-linker:prodStyles',
  ]);
};
