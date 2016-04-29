var Tab = React.createClass({
   displayName: 'Tab',

   getInitialState() {
      return { hover: false };
   },
   _handleClickTab() {
      this.props.onClick(this.props.tab);
   },
   _handleHoverEnter() {
      this.setState({ hover: true });
   },
   _handleHoverExit() {
      this.setState({ hover: false });
   },
   render() {
      let tab = this.props.tab;
      let classes = '';
      let style = {};
      if (this.props.selected) {
         classes += 'tab-selected ';
         style.color = tab.color;
      }
      if (this.state.hover) {
         style.color = tab.color;
      }
      return React.createElement(
         'li',
         { className: classes },
         React.createElement(
            'a',
            { href: '#', onClick: this._handleClickTab, onMouseEnter: this._handleHoverEnter, onMouseLeave: this._handleHoverExit, style: style },
            tab.text
         )
      );
   }
});

var SearchingBox = React.createClass({
   displayName: 'SearchingBox',

   getInitialState() {
      return { selectedTab: this.props.tabs[0], q: '' };
   },
   _handleClickTab(tab) {
      if (tab !== this.state.selectedTab) {
         let search = {
            q: this.state.q,
            category: tab.text
         };
         this.props.onSearch(search);
         this.setState({ selectedTab: tab });
      }
   },
   _handleSearchKeyPress(event) {
      let str = event.target.value;
      if (this.props.onSearch && str !== this.state.q) {
         let search = {
            q: str,
            category: this.state.selectedTab.text
         };
         this.props.onSearch(search);
         this.setState({ q: str });
      }
   },
   render() {
      let tabs = this.props.tabs;
      let graphicTabs = null;
      if (tabs) {
         graphicTabs = tabs.map((tab, index) => {
            return React.createElement(Tab, { key: index, tab: tab, selected: tab.text === this.state.selectedTab.text, onClick: this._handleClickTab });
         });
      }
      return React.createElement(
         'div',
         { className: 'searching-box-container' },
         React.createElement(
            'div',
            { className: 'top-list-container dark-gradient' },
            React.createElement(
               'ul',
               { className: 'top-list' },
               graphicTabs
            )
         ),
         React.createElement(
            'div',
            { className: 'searching-box' },
            React.createElement('input', { type: 'text', className: 'input-search', onKeyUp: this._handleSearchKeyPress, placeholder: this.state.selectedTab.placeholder })
         )
      );
   }
});