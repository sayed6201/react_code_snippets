import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Auth, Analytics, API, graphqlOperation, Cache } from 'aws-amplify';
import { graphql, compose, withApollo } from "react-apollo";
import gql from 'graphql-tag';
import { listPillReminders } from '../../graphql/queries';
import { createPillReminders, deletePillReminders } from '../../graphql/mutations';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as $ from 'jquery';
import 'bootstrap';
import '../../custom'
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';

class PillReminder extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({

        });

        this.state = { pillName: '', dosage: '', reminderTime: '', profile: {}, listPillReminders: {}, error: "", show: false, subscription:"", signedIn:true }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        if (this.state.pillName !== '' && this.state.dosage !== '' && this.state.reminderTime !== '')
            this.setState({ show: true })
        else
            this.setState({ show: false })
    }

    convertTime(time) {

        time = time.split(':'); // convert to array
        var d = new Date();

        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);

        // calculate
        var timeValue="";

        if (hours > 0 && hours <= 12) {
            timeValue = "" + hours;
        } else if (hours > 12) {
            timeValue = "" + (hours - 12);
        } else if (hours === 0) {
            timeValue = "12";
        }

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

        // show
        return timeValue;

    }

    convertUTCTime(time) {

        time = time.split(':'); // convert to array
        var d = new Date();
        var n = d.getTimezoneOffset()/60;

        // fetch
        var hours = Number(time[0])+n;
        var minutes = Number(time[1]);

        if(hours>=24)
        	hours=hours-24;
            const zeroPad = (num, places) => String(num).padStart(places, '0')

        
        // calculate
        var timeValue="";

        if (hours > 0 && hours <= 12) {
            
            timeValue += "" + zeroPad(hours,2);
        } else if (hours > 12) {
            timeValue = "" + zeroPad(hours - 12, 2);
        } else if (hours === 0) {
            timeValue = "12";
        }

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

        // show
        return timeValue;

    }



    async componentDidMount() {
        Cache.setItem("newMessage", false);
        //create subscription for pill reminder
        const config = {
            pushKey: "BLTokEyPCbU582hrlyX63SgH_pXeal7I_2-wKwLVrUKNj9c-Z36SuA7rY_3fSJ-l4DUiWYpuRk2HjdLVkc8y0Js",
          };

        let swReg = await navigator.serviceWorker.register("/worker.js");
        const subscription = await swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(config.pushKey),
        });
        this.setState({subscription:JSON.stringify(subscription)});

        function urlB64ToUint8Array(base64String) {
            const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
            const base64 = (base64String + padding)
              .replace(/\-/g, "+")
              .replace(/_/g, "/");
    
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
    
            for (let i = 0; i < rawData.length; ++i) {
              outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
          }
try{
        Auth.currentAuthenticatedUser().then(async (user) => {
            this.setState({ profile: user })
            try {
                //list pill reminders for current user
                const apiData = await API.graphql({
                    query: listPillReminders,
                    variables: {
                        filter: { Username: { eq: user.username } },
                    },
                    errorPolicy: 'all'
                })
                const pillList = apiData.data.listPillReminders
                this.setState({ listPillReminders: pillList.items ? pillList : [] })
                this.forceUpdate();


            }
            catch (err) {
                console.log("console: ", err)
            }
        });
    }
    catch (err) {
        console.log("console: ", err)
        this.setState({ signedIn: false })
    }

        //Adding Background for Gradient
        if (!$('.menu-hider').length) { $('.page-content').append('<div class="menu-hider"><div>'); }

        /*Menu Extender Function*/
        $.fn.showMenu = function () {
            $(this).addClass('menu-active'); $('#footer-bar').addClass('footer-menu-hidden');
            $('.header').addClass('header-hidden');
            setTimeout(function () { $('.menu-hider').addClass('menu-active'); }, 250);
        };
        $.fn.hideMenu = function () {
            $(this).removeClass('menu-active');
            $('#footer-bar').removeClass('footer-menu-hidden');
            $('.header').removeClass('header-hidden');
            $('.menu-hider').removeClass('menu-active');
        };

        //Menu Required Variables
        var menu = $('.menu'),
            body = $('body'),
            menuFixed = $('.nav-fixed'),
            menuFooter = $('#footer-bar'),
            menuHider = $('body').find('.menu-hider'),
            menuClose = $('.close-menu'),
            header = $('.header'),
            pageAll = $('#page'),
            pageContent = $('.page-content'),
            headerAndContent = $('.header, .page-content, #footer-bar'),
            menuDeployer = $('a[data-menu]');

        //Menu System
        menu.each(function () {
            var menuHeight = $(this).data('menu-height');
            var menuWidth = $(this).data('menu-width');
            var menuActive = $(this).data('menu-active');
            if ($(this).hasClass('menu-box-right')) { $(this).css("width", menuWidth); }
            if ($(this).hasClass('menu-box-left')) { $(this).css("width", menuWidth); }
            if ($(this).hasClass('menu-box-bottom')) { $(this).css("height", menuHeight); }
            if ($(this).hasClass('menu-box-top')) { $(this).css("height", menuHeight); }
            if ($(this).hasClass('menu-box-modal')) { $(this).css({ "height": menuHeight, "width": menuWidth }); }
        });

        //Menu Deploy Click
        menuDeployer.on('click', function () {
            menu.removeClass('menu-active');
            menuHider.addClass('menu-active');

            var menuData = $(this).data('menu');
            var menuID = $('#' + menuData);
            var menuEffect = $('#' + menuData).data('menu-effect');
            var menuWidth = menuID.data('menu-width');
            var menuHeight = menuID.data('menu-height');
            $('body').addClass('modal-open');
            $('#footer-bar').addClass('footer-menu-hidden');
            $('.header').addClass('header-hidden');
            if (menuID.hasClass('menu-header-clear')) { menuHider.addClass('menu-active-clear'); }
            function menuActivate() { menuID = 'menu-active' ? menuID.addClass('menu-active') : menuID.removeClass('menu-active'); }
            if (menuID.hasClass('menu-box-bottom')) { $('#footer-bar').addClass('footer-menu-hidden'); $('.header').addClass('header-hidden'); }
            if (menuEffect === "menu-parallax") {
                if (menuID.hasClass('menu-box-bottom')) { headerAndContent.css("transform", "translateY(" + (menuHeight / 5) * (-1) + "px)"); }
                if (menuID.hasClass('menu-box-top')) { headerAndContent.css("transform", "translateY(" + (menuHeight / 5) + "px)"); }
                if (menuID.hasClass('menu-box-left')) { headerAndContent.css("transform", "translateX(" + (menuWidth / 5) + "px)"); }
                if (menuID.hasClass('menu-box-right')) { headerAndContent.css("transform", "translateX(" + (menuWidth / 5) * (-1) + "px)"); }
            }
            if (menuEffect === "menu-push") {
                if (menuID.hasClass('menu-box-bottom')) { headerAndContent.css("transform", "translateY(" + (menuHeight) * (-1) + "px)"); }
                if (menuID.hasClass('menu-box-top')) { headerAndContent.css("transform", "translateY(" + (menuHeight) + "px)"); }
                if (menuID.hasClass('menu-box-left')) { headerAndContent.css("transform", "translateX(" + (menuWidth) + "px)"); }
                if (menuID.hasClass('menu-box-right')) { headerAndContent.css("transform", "translateX(" + (menuWidth) * (-1) + "px)"); }
            }
            if (menuEffect === "menu-push-full") {
                if (menuID.hasClass('menu-box-left')) { headerAndContent.css("transform", "translateX(100%)"); }
                if (menuID.hasClass('menu-box-right')) { headerAndContent.css("transform", "translateX(-100%)"); }
            }
            menuActivate();
        });

        var autoActivateMenu = $('[data-auto-activate]');
        if (autoActivateMenu.length) {
            autoActivateMenu.addClass('menu-active');
            menuHider.addClass('menu-active');
        }

        //Allows clicking even if menu is loaded externally.
        $('body').removeClass('modal-open');
        $('.menu-hider, .close-menu, .menu-close').on('click', function () {
            menu.removeClass('menu-active');
            menuHider.removeClass('menu-active menu-active-clear');
            headerAndContent.css('transform', 'translate(0,0)');
            menuHider.css('transform', 'translate(0,0)');
            $('#footer-bar').removeClass('footer-menu-hidden');
            $('.header').removeClass('header-hidden');
            $('body').removeClass('modal-open');
            return false;
        });

    }
    //Create new pill reminder
    UpdateMeds = async () => {
        this.setState({ error: "" })
        const { pillName, dosage, reminderTime, profile, subscription } = this.state
        var menu = $('.menu'),
            menuHider = $('body').find('.menu-hider'),
            headerAndContent = $('.header, .page-content, #footer-bar')

        if (this.validator.allValid()) {

            try {
                await API.graphql({
                    query: createPillReminders,
                    variables: {
                        input: {
                            Username: profile.username,
                            PillName: pillName,
                            Dosage: dosage,
                            ReminderTime: this.convertTime(reminderTime),
                            Subscription: subscription,
                            ReminderTimeStamp: this.convertUTCTime(reminderTime),
                        },
                    },
                    errorPolicy: 'all'
                })
                this.setState({ pillName: "" })
                this.setState({ dosage: "" })
                this.setState({ reminderTime: "" })
                menu.removeClass('menu-active');
                menuHider.removeClass('menu-active menu-active-clear');
                headerAndContent.css('transform', 'translate(0,0)');
                menuHider.css('transform', 'translate(0,0)');
                $('#footer-bar').removeClass('footer-menu-hidden');
                $('.header').removeClass('header-hidden');
                $('body').removeClass('modal-open');
                const apiData = await API.graphql({
                    query: listPillReminders,
                    variables: {
                        filter: { Username: { eq: profile.username } },
                    },
                    errorPolicy: 'all'
                })
                const pillList = apiData.data.listPillReminders
                this.setState({ listPillReminders: pillList.items ? pillList : [] })
                this.forceUpdate();


            }
            catch (err) {
                console.log("console: ", err)
            }
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    //Remove pill reminder
    DeleteMed = async (pillID) => {

        try {
            const input = { PillReminderID: pillID };
            await API.graphql({
                query: deletePillReminders, variables: {
                    input: input
                }
            });
            const apiData = await API.graphql({
                query: listPillReminders,
                variables: {
                    filter: { Username: { eq: this.state.profile.username } },
                },
                errorPolicy: 'all'
            })
            const pillList = apiData.data.listPillReminders
            this.setState({ listPillReminders: pillList.items ? pillList : [] })
            this.forceUpdate();


        }
        catch (err) {
            console.log("console: ", err)
        }
    }

    render() {
        return (<>
            <div className="page-content header-clear-medium " style={{ height: '100vh' }}>
            {!this.state.signedIn && <Redirect to={{ pathname: '/signin' }} />}

                <div className="card card-style">
                    <div className="content mb-0">
                        <h2 className="mb-0">Medications</h2>
                        <p className="mb-4">
                            A list of all your meds you would like reminders on.
                        </p>
                        <table className="table table-borderless text-center rounded-sm shadow-l" style={{ overflow: 'hidden' }}>
                            <thead>
                                <tr>
                                    <th scope="col" className="bg-dark1-light">Pill</th>
                                    <th scope="col" className="bg-dark1-light">Dosage</th>
                                    <th scope="col" className="bg-dark1-light">Time</th>
                                    <th scope="col" className="bg-dark1-light">Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listPillReminders.items ? this.state.listPillReminders.items.map(
                                    pill => (
                                        <tr key={pill.PillReminderID}>

                                            <td>{pill.PillName}</td>
                                            <td>{pill.Dosage}</td>
                                            <td>{pill.ReminderTime}</td>
                                            <td onClick={this.DeleteMed.bind(this, pill.PillReminderID)}><FontAwesomeIcon className="input-icon color-red2-dark" icon='trash' /></td>
                                        </tr>

                                    )) : null}
                            </tbody>
                        </table>
                        <a href="#" data-menu="menu-action-parallax" className="btn btn-full bg-red2-dark btn-m text-uppercase rounded-sm shadow-l mb-3 mt-4 font-900">Add Medication</a>
                        <Link to="/profile/" className="btn btn-full bg-red2-dark btn-m text-uppercase rounded-sm shadow-l mb-3 mt-4 font-900">Return to profile</Link>
                    </div>
                </div>

                <div id="menu-action-parallax" className="menu menu-box-modal rounded-m" data-menu-width="320" data-menu-height="400">
                    <div className="menu-title"><h1>Add Medication</h1><p className="color-green1-dark"></p><a href="#" className="close-menu"><i className="fa fa-times"></i></a></div>
                    <div className="divider divider-margins mb-1 mt-3"></div>
                    <div className="content px-1">
                        <div className="input-style input-style-1 input-required">
                            <h5 className="font-700 font-11 opacity-30 text-uppercase ">Pill Name</h5>
                            <em><i className="fa fa-angle-down"></i></em>
                            <input type="text" name="pillName" className="form-control" placeholder="Pill Name" value={this.state.pillName} onChange={this.onChange} />
                            {this.validator.message('Pill Name', this.state.pillName, 'required')}
                        </div>
                        <div className="input-style input-style-1 input-required">
                            <h5 className="font-700 font-11 opacity-30 text-uppercase ">Dosage</h5>
                            <em><i className="fa fa-angle-down"></i></em>
                            <input type="text" maxLength="7" name="dosage" className="form-control" placeholder="Dosage" value={this.state.dosage} onChange={this.onChange} />
                            {this.validator.message('Dosage', this.state.dosage, 'required')}
                        </div>
                        <div className="input-style input-style-1 input-required mb-4">
                            <h5 className="font-700 font-11 opacity-30 text-uppercase ">Reminder Time</h5>
                            <em></em>
                            <input type="time" name="reminderTime" className="form-control" step="3000" value={this.state.reminderTime} onChange={this.onChange} />
                            {this.validator.message('Reminder Time', this.state.reminderTime, 'required')}
                        </div>

                        <div onClick={this.UpdateMeds.bind(this)} className="btn btn-full btn-m bg-red2-dark rounded-sm text-uppercase font-800">Submit Medications</div>
                        <br></br>
                        <div className="btn btn-full btn-m bg-red2-dark rounded-sm text-uppercase font-800 close-menu">Cancel</div>

                    </div>
                </div>

            </div>
            <div id="toast-2" className="toast toast-tiny toast-top bg-highlight" data-delay="3000" data-autohide="true"><i className="fa fa-sync fa-spin mr-3"></i>Invalid time entered</div>
        </>
        )
    }
}


export default withApollo(PillReminder)