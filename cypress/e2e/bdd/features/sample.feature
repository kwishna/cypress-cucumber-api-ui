@animationDistanceThreshold(5)
@blockHosts('http://www.foo.com','http://www.bar.com')
@defaultCommandTimeout(5)
@env(foo='bar',baz=5,qux=false)
@execTimeout(5)
@includeShadowDom(true)
@includeShadowDom(false)
@keystrokeDelay(5)
@numTestsKeptInMemory(5)
@pageLoadTimeout(5)
@redirectionLimit(5)
@requestTimeout(5)
@responseTimeout(5)
@retries(5)
@retries(runMode=5)
@retries(openMode=5)
@retries(runMode=5,openMode=10)
@retries(openMode=10,runMode=5)
@screenshotOnRunFailure(true)
@screenshotOnRunFailure(false)
@scrollBehavior('center')
@scrollBehavior('top')
@scrollBehavior('bottom')
@scrollBehavior('nearest')
@slowTestThreshold(5)
@viewportHeight(720)
@viewportWidth(1280)
@waitForAnimations(true)
@waitForAnimations(false)
Feature: Done
Scenario Outline: Steps will run conditionally if tagged
  Given user is logged in
  When user clicks "<link>"
  Then user will be logged out

  @mobile
  Examples:
    | link                  |
    | logout link on mobile |

  @desktop
  Examples:
    | link                   |
    | logout link on desktop |