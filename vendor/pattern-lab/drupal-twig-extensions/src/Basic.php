<?php

namespace PatternLab\DrupalTwigExtensions;

use Twig_Extension;
use Twig_ExtensionInterface;
use Twig_SimpleFilter;
use Twig_SimpleFunction;

class Basic extends Twig_Extension implements Twig_ExtensionInterface {

  public static function returnParam($param) {
    return $param;
  }

  public static function inertHref() {
    return '#';
  }

  /**
   * Returns a list of filters to add to the existing list.
   *
   * @link Drupal Twig Filters - https://www.drupal.org/docs/8/theming/twig/filters-modifying-variables-in-twig-templates
   * @return Twig_SimpleFilter[]
   */
  function getFilters() {
    return [
        new Twig_SimpleFilter('t', [$this, 'returnParam']),
        new Twig_SimpleFilter('render', [$this, 'returnParam']),
        new Twig_SimpleFilter('placeholder', [$this, 'returnParam']),
        new Twig_SimpleFilter('without', [$this, 'returnParam']),
    ];
  }

  /**
   * Returns a list of functions to add to the existing list.
   *
   * @link Drupal Twig Functions - https://www.drupal.org/node/2486991
   * @return Twig_SimpleFunction[]
   */
  function getFunctions() {
    return [
        new Twig_SimpleFunction('url', [$this, 'inertHref']),
        new Twig_SimpleFunction('path', function ($string) {
          if ($string === '<front>') {
            return '/';
          } else {
            return $string;
          }
        }),
        new Twig_SimpleFunction('link', [$this, 'inertHref']),
        new Twig_SimpleFunction('file_url', [$this, 'returnParam']),
    ];
  }

  /**
   * Returns a list of global variables to add to the existing list.
   *
   * @return array An array of global variables
   *
   * @deprecated since 1.23 (to be removed in 2.0), implement Twig_Extension_GlobalsInterface instead
   */
  function getGlobals() {
    return [];
  }

  /**
   * Returns the name of the extension.
   *
   * @return string The extension name
   *
   * @deprecated since 1.26 (to be removed in 2.0), not used anymore internally
   */
  function getName() {
    return 'PatternLab\DrupalTwigExtensions\Basic';
  }
}
