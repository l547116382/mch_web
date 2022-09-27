{
    'name': 'Diagram Editor',
    'version': '14.0.1.0.0',
    'category': 'Extra Tools',
    'license': 'LGPL-3',
    'description': 'Diagram Editor',
    'author': 'lmch',
    'maintainer': 'lmch',
    'website': 'https://github.com/l547116382',
    'depends': ['web'],
    'data': [
        'views/assets.xml'
    ],
    'qweb': [
        'static/src/xml/diagram_editor.xml'
    ],
    'images': ['static/description/banner.gif'],
    'application': False,
    'installable': True,
    'auto_install': False,
}
