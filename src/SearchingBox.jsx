var Tab = React.createClass({
   getInitialState() {
      return ({hover: false})
   },
   _handleClickTab() {
      this.props.onClick(this.props.tab)
   },
   _handleHoverEnter() {
      this.setState({hover: true})
   },
   _handleHoverExit() {
      this.setState({hover: false})
   },
   render() {
      let tab = this.props.tab
      let classes = ''
      let style = {}
      if (this.props.selected) {
         classes += 'tab-selected '
         style.color = tab.color
      }
      if (this.state.hover) {
         style.color = tab.color
      }
      return (
         <li className={classes}>
            <a href="#" onClick={this._handleClickTab} onMouseEnter={this._handleHoverEnter} onMouseLeave={this._handleHoverExit} style={style}>{tab.text}</a>
         </li>
      )
   }
})

var SearchingBox = React.createClass({
   getInitialState() {
      return ({selectedTab: this.props.tabs[0], q: ''})
   },
   _handleClickTab(tab) {
      if (tab !== this.state.selectedTab) {
         let search = {
            q: this.state.q,
            category: tab.text
         }
         this.props.onSearch(search)
         this.setState({selectedTab: tab})
      }
   },
   _handleSearchKeyPress(event) {
      let str = event.target.value
      if (this.props.onSearch && str !== this.state.q) {
         let search = {
            q: str,
            category: this.state.selectedTab.text
         }
         this.props.onSearch(search)
         this.setState({q: str})
      }
   },
   render() {
      let tabs = this.props.tabs
      let graphicTabs = null
      if (tabs) {
         graphicTabs = tabs.map((tab, index) => {
            return (<Tab key={index} tab={tab} selected={tab.text === this.state.selectedTab.text} onClick={this._handleClickTab}/>)
         })
      }
      return (
         <div className="searching-box-container">
            <div className="top-list-container dark-gradient">
               <ul className="top-list">
                  {graphicTabs}
               </ul>
            </div>
            <div className="searching-box">
               <input type="text" className="input-search" onKeyUp={this._handleSearchKeyPress} placeholder={this.state.selectedTab.placeholder}></input>
            </div>
         </div>
      );
   }
})
