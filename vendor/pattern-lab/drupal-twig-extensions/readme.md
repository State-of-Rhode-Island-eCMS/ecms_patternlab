# Drupal Twig Extensions for Pattern Lab

Todo: publish on Packagist

## How to use

- Ensure your [Twig Pattern Engine](https://github.com/pattern-lab/patternengine-php-twig) is v2.2.0 +
- Install this via composer (docs coming after it gets on Packagist)
- Add this to `config.yml`:

```yml
twigExtensions:
    - '\PatternLab\DrupalTwigExtensions\Basic'
```

## Motivation

This allows Twig templates that are used in both Pattern Lab and Drupal environments to function correctly. Many times this is simply providing the function so the templates can work. In Drupal if `{{ my_var | t }}` is seen, then `my_var` is then marked as translatable; so all we need to do in Pattern Lab is well, nothing. We just take the variable and let it pass right through.

## Twig Functionality Provided

### Filters

- `t`
- `render`
- `placeholder`
- `without`

### Functions

- `url`
- `path`
- `link`
