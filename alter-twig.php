<?php

/**
 * @param Twig\Environment $env - The Twig Environment
 * @param $config - Config of `@basalt/twig-renderer`
 */
function addCustomExtension(\Twig\Environment &$env, $config) {

  /**
   * @example `<h1>Hello {{ customTwigFunctionThatSaysWorld() }}!</h1>` => `<h1>Hello Custom World</h1>`
   */
//  $env->addFunction(new \Twig\TwigFunction('customTwigFunctionThatSaysWorld', function () {
//    return 'Custom World';
//  }));

  /*
   * Reverse a string
   * @param string $theString
   * @example `<p>{{ reverse('abc') }}</p>` => `<p>cba</p>`
   */
  // $env->addFunction(new \Twig\TwigFunction('reverse', function ($theString) {
  //   return strrev($theString);
  // }));

//  $env->addExtension(new \My\CustomExtension());

//  `{{ foo }}` => `bar`
//  $env->addGlobal('foo', 'bar');

  // Add drupal filters
  // |t
  $env->addFilter(new \Twig\TwigFilter('t', function ($theString) {
    return $theString;
  }));

  // |render
  $env->addFilter(new \Twig\TwigFilter('render', function ($theArray) {
    return $theArray;
  }));

  // Add drupal functions.
  // link()
  $env->addFunction(new \Twig\TwigFunction('link', function ($title, $url, $attributes) {
    if (isset($attributes) && isset($attributes['class'])) {
      $classes = join(' ', $attributes['class']);
      return '<a href="' . $url . '" class="' . $classes . '">' . $title . '</a>';
    } else {
      return '<a href="' . $url . '">' . $title . '</a>';
    }
  }));

  // Enable debug.
  $env->addExtension(new \Twig\Extension\DebugExtension());

}
