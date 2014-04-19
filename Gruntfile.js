module.exports = function(grunt){
  var srcFiles = [
    'src/behavior_lab.js',
    'src/boundary_lab.js',
    'src/controller_lab.js',
    'src/helper_lab.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '<%= pkg.banner.divider %>' +
              '<%= pkg.banner.project %>' +
              '<%= pkg.banner.copyright %>' +
              '<%= pkg.banner.license %>' +
              '<%= pkg.banner.licenseLink %>' +
              '<%= pkg.banner.divider %>' +
              '\n' +
              '// Version: <%= pkg.version %> | From: <%= grunt.template.today("dd-mm-yyyy") %>\n\n'
    },
    jasmine: {
      src: ['node_modules/stik.js/stik.js'].concat(srcFiles),
      options: {
        specs: 'specs/*_spec.js'
      }
    },
    concat: {
      options: {
        separator: '\n',
        banner: '<%= meta.banner %>'
      },
      src: {
        src: srcFiles,
        dest: '<%= pkg.name %>'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      stik: {
        files: {
         'stik-labs.min.js': ['stik-labs.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', 'jasmine');
  grunt.registerTask('pack', ['concat', 'uglify']);
};
