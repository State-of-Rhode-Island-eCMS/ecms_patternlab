# ecms_patternlab
Pattern lab design system for the eCMS system

## Getting started

To use this pattern lab, you need to include the custom repository in your
composer.json file:

```json
"repositories": [
    {
        "type": "git",
        "url": "git@github.com/State-of-Rhode-Island-eCMS/ecms_patternlab.git"
    }
],
```

Then, require it like any other project:

```bash
composer require rhodeislandecms/ecms_patternlab
```

Also, be sure to allow dependencies to patch files with:
```bash
composer config extra.enable-patching true
```

In the project you intend to use this design system, be sure to setup 
the installer path to point to your desired theme:

```json
    "extra": {
        "installer-types": ["pattern-lab"],
        "installer-paths": {
            "docroot/path/to/my/theme/{$name}": ["type:pattern-lab"]
        },
    }
```
