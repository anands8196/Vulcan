Package.describe({
  name: 'vulcan:forms-upload',
  summary: 'Vulcan package extending vulcan:forms to upload images to Cloudinary from a drop zone.',
  version: '1.15.1',
  git: 'https://github.com/xavcz/nova-forms-upload.git',
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.1');

  api.use(['vulcan:core@=1.15.1', 'vulcan:forms@=1.15.1', 'fourseven:scss@4.12.0']);

  api.addFiles(['lib/Upload.scss'], 'client');

  api.mainModule('lib/modules.js', ['client', 'server']);
});
