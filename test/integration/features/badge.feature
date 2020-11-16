Feature: removal of the Travis CI badge

  Scenario: inline badge
    Given an inline travis-ci badge exists
    When a node is processed
    Then the travis-ci badge is removed from the README

  Scenario: inline badge with other inline badges
    Given an inline travis-ci badge exists
    And other inline badges exist
    When a node is processed
    Then the travis-ci badge is removed from the README

  Scenario: badge with referenced definitions
    Given a travis-ci badge exists with referenced definitions
    When a node is processed
    Then the travis-ci badge is removed from the README

  Scenario: badge with referenced definitions and other badges with referenced definitions
    Given a travis-ci badge exists with referenced definitions
    And other badges exist with referenced definitions
    When a node is processed
    Then the travis-ci badge is removed from the README
