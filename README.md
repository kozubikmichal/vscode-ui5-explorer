# UI5 Explorer

This extension brings api reference for [SAPUI5](https://sapui5.hana.ondemand.com/) and [OpenUI5](https://openui5.org/) Frameworks directly into the [Visual Studio Code](https://code.visualstudio.com/).

## Features

### Browse

You can browse through the whole api reference using new activity bar panel. To open the browser simply click the UI5 icon:


![feature browser](media/feature-browser.png)

### Search

UI5 Explorer also allows you to search for specific module you want to invesitage. To open search bar you can simply click the search icon:

![feature search-by-icon](media/feature-search-by-icon.png)

Or execute **UI5 Explorer: Search** command:

![feature search-by-command](media/feature-search-by-command.png)

After that you will be prompted to select which module you want to open:

![feature search-quickpick](media/feature-search-quickpick.png)

### Explore

When you select a module to explore either by selecting it from tree or by search input you can see the whole module description:

![feature explorer](media/feature-explorer.png)

Currently these parts are supported and displayed:
  * Header with general information (library, component, version, links...)
  * Overview description
  * Constructor
  * Fields
  * Methods
  * Events
  * Properties
  * Aggregations
  * Associations

In the future there will be added support for:
  * Inherited method, properties etc.
  * Collapsible/Expandable methods and events descriptions
  * Kind of *Table of contents* at the top of the page
  * Outline view under the Api Reference tree browser

Within the module exploration there are several link types fully working:
  * Anchor links that scolls the page to the method/event of the current module
  ![feature link-anchor](media/feature-link-anchor.gif)
  * Api links that navigates you to the new view with another module explorer
  ![feature link-api](media/feature-link-api.gif)
  * External links navigating you to the external sources (eg. documentation, guidelines etc.)
  ![feature link-external](media/feature-link-external.png)

### Clear Cache

Use `UI5 Explorer: Clear Cache` to reset memory storage, cached files etc.

## Extension Settings

This extension contributes the following settings:

* `ui5explorer.framework`: select whether to fetch data for [OpenUI5](https://openui5.org/) (default) or [SAPUI5](https://sapui5.hana.ondemand.com/) Framework
* `ui5explorer.version`: select UI5 version to be used (currently supported only for 1.54+ versions due to different file structure for older versions)

## Release Notes

## 0.5.0
- Added support for **Deprecated** flag

## 0.4.0
- Added support for UI5 >= 1.63
- Undefined description is not rendered anymore
- Updated axios version

## 0.3.0
- Configurable UI5 Version (limited usage)
- Reload tree after configuration change
- Added file cache
- New **Clear Cache** command
- Bugfixes (eg. for *sap.ui.base.EventProvider*)

## 0.2.x
- Collapsible/Expandable methods and events
- Quick navigation to sections under the header
- "Back to top" button at the bottom right corner
- Better links support (aggregations, associations, method/event parameters...)
- Added support for methods without parameters
- Added "default" aggragation marker
- Several bug fixes

## 0.1.0 - 2018-06-27
- Marketplace adjustment (icon, description, links...)

### 0.0.1

First beta version


## FAQ

Feel free to open a new issue github if you find something not working or if you have some feature request.

**Enjoy!**
