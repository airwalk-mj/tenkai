import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import { style } from "variables/Variables.jsx";

import routes from "routes.js";

import image from "assets/img/sidebar-8.jpg";
import "assets/css/loading.css"
import Keycloak from 'keycloak-js';
import axios from 'axios';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keycloak: null,
      authenticated: false,
      loading: false,
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }

  handleLoading = value => {
    this.setState({ loading: value });
  }

  handleNotification = (type, level, message) => {
    switch (type) {
      case "custom":
        this.state._notificationSystem.addNotification({
          title: <span data-notify="icon" className="pe-7s-gift" />,
          message: (
            <div>
              {message}
            </div>
          ),
          level: level,
          position: "tr",
          autoDismiss: 15
        });
        break;
      case "deployment_ok":
        this.state._notificationSystem.addNotification({
          title: <span data-notify="icon" className="pe-7s-gift" />,
          message: (
            <div>
              Deployment <b>successful</b>.<br />Use "kubectl get pods/services" to check it
              </div>
          ),
          level: level,
          position: "tr",
          autoDismiss: 15
        });
        break;
      case "deployment_fail":
        this.state._notificationSystem.addNotification({
          title: <span data-notify="icon" className="pe-7s-gift" />,
          message: (
            <div>
              :( Deployment <b>failed</b>!!!
                </div>
          ),
          level: level,
          position: "tr",
          autoDismiss: 15
        });
        break;
      case "general_fail":
        this.state._notificationSystem.addNotification({
          title: <span data-notify="icon" className="pe-7s-gift" />,
          message: (
            <div>
              :( I am sorry,an unexpectect <b>error</b> ocurred!
                  </div>
          ),
          level: level,
          position: "tr",
          autoDismiss: 15
        });
        break;
      default:
        break;
    }

  }

  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };

  getRoutes = routes => {
    return routes.map((prop, key) => {
      let auth = this.state.keycloak.hasRealmRole(prop.role);
      if (prop.layout === "/admin" && auth) {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
                handleNotification={this.handleNotification}
                handleLoading={this.handleLoading}
                keycloak={this.state.keycloak}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };


  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated, _notificationSystem: this.refs.notificationSystem }, () => {
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}` 
      });
    });
    
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {

    let loadingDiv;
    if (this.state.loading) {
      loadingDiv = <div className="loading"></div>
    } else {
      loadingDiv = <div></div>
    }

    if (this.state.keycloak) {
      if (this.state.authenticated)

        return (
          <div className="wrapper">
            <NotificationSystem ref="notificationSystem" style={style} />
            
            <Sidebar {...this.props} routes={routes} image={this.state.image}
              color={this.state.color}
              hasImage={this.state.hasImage} 
              keycloak={this.state.keycloak} />

            <div id="main-panel" className="main-panel" ref="mainPanel">
              {loadingDiv}
              <AdminNavbar
                {...this.props}
                brandText={this.getBrandText(this.props.location.pathname)}
                keycloak={this.state.keycloak}
                history={this.props.history}
              />
              <Switch>{this.getRoutes(routes)}</Switch>
              <Footer />
            </div>
          </div>
        ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      
      <div>
        <NotificationSystem ref="notificationSystem" style={style} />
        Initializing Keycloak...
      </div>
    );

  }
}

export default Admin;
