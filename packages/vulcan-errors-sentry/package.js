Package.describe({
  name: 'vulcan:errors-sentry',
  summary: 'Vulcan Sentry error tracking package',
  version: '1.15.1',
  git: 'https://github.com/VulcanJS/Vulcan.git',
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.1');

  api.use(['ecmascript', 'vulcan:core@=1.15.1', 'vulcan:users@=1.15.1', 'vulcan:errors@=1.15.1']);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
