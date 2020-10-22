<?php

/**
 * @param Twig_Environment $env - The Twig Environment - https://twig.symfony.com/api/1.x/Twig_Environment.html
 * @param $config - Config of `@basalt/twig-renderer`
 */
function addCustomExtension(\Twig_Environment &$env, $config) {

  /**
   * @example `<h1>Hello {{ customTwigFunctionThatSaysWorld() }}!</h1>` => `<h1>Hello Custom World</h1>`
   */
//  $env->addFunction(new \Twig_SimpleFunction('customTwigFunctionThatSaysWorld', function () {
//    return 'Custom World';
//  }));

  /*
   * Reverse a string
   * @param string $theString
   * @example `<p>{{ reverse('abc') }}</p>` => `<p>cba</p>`
   */
  // $env->addFunction(new \Twig_SimpleFunction('reverse', function ($theString) {
  //   return strrev($theString);
  // }));

//  $env->addExtension(new \My\CustomExtension());

//  `{{ foo }}` => `bar`
//  $env->addGlobal('foo', 'bar');

  // Add drupal filters
  // |t
  $env->addFilter(new \Twig_SimpleFilter('t', function ($theString) {
    return $theString;
  }));

  // |render
  $env->addFilter(new \Twig_SimpleFilter('render', function ($theArray) {
    return $theArray;
  }));

  // Add drupal functions.
  // link()
  $env->addFunction(new \Twig_SimpleFunction('link', function ($title, $url, $attributes) {
    if (isset($attributes) && isset($attributes['class'])) {
      $classes = join(' ', $attributes['class']);
      return '<a href="' . $url . '" class="' . $classes . '">' . $title . '</a>';
    } else {
      return '<a href="' . $url . '">' . $title . '</a>';
    }
  }));

  // Enable debug.
  $env->addExtension(new \Twig_Extension_Debug());

}
