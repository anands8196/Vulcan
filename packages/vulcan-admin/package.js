Package.describe({
  name: 'vulcan:admin',
  summary: 'Vulcan components package',
  version: '1.15.1',
  git: 'https://github.com/VulcanJS/Vulcan.git',
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.1');

  api.use([
    'fourseven:scss@4.12.0',
    'dynamic-import@0.1.1',
    // Vulcan packages
    'vulcan:core@=1.15.1',
  ]);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

  api.addFiles(['lib/stylesheets/style.scss'], ['client']);
});
