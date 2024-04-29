# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.1.6] - 2024-04-29

## [3.1.5] - 2023-11-23

## [3.1.4] - 2022-08-10

### Fix
- update e-mail and documentation

## [3.1.3] - 2022-08-05

### Added

## [3.1.2] - 2022-08-04

### Fix

- Always return a decimal in the price of the products.
- For this, the type of the response was changed from number to string.
- Test was performed on the mail template to validate that it does not affect its current operation.
- The template is created before a certain event.
- Improve CHANGELOG.md and messages of metadata
- Trigger automation to present app documentation at https://developers.vtex.com/.

## [3.1.1] - 2022-05-16

### Fix

- Add a new event, to configure the type of template that will be used in to send emails

## [3.0.0] - 2021-06-9

### Added

- Add a new event, to configure the type of template that will be used in to send emails

## [2.0.7] - 2021-04-10

### Added

- Add validation to exclude items without stock and fix linter errors

## [0.0.7] - 2021-01-05

### Added

- Add send-message policy and connection to catalog with catalog-api-proxy

## [0.0.5] - 2020-12-16

## [0.0.4] - 2020-10-27

### Fix

- Use "X-Vtex-Use-Https" header in the clients

## [0.0.3] - 2020-10-27

### Fix

- Use http protocol in the clients

## [0.0.2] - 2020-10-27

### Added

- README.md documentation

## [0.0.1] - 2020-10-27

### Added

- Initial implementation
