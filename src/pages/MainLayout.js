import React, {Component} from 'react';
import $ from 'jquery'

import CommonStyle from '../assets/css/style.js';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';

class MainLayout extends Component {
    componentDidMount(){
        $('[data-toggle=offcanvas]').click(function() {
            $('.row-offcanvas').toggleClass('active');
        });
    }

    render() {
        return(
            <CommonStyle>
                <Header {...this.props.children.props}></Header>
                <div className="container-fluid h-100" id="main">
                    <div className="row row-offcanvas row-offcanvas-left h-100 active">
                        <Sidebar {...this.props.children.props} ></Sidebar>
                        {this.props.children} {/** main content shows here */}
                    </div>
                </div>    
                <Footer {...this.props.children.props}></Footer>
            </CommonStyle>
        )
    }
}

export default MainLayout;