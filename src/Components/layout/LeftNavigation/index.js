import React from 'react';
import routeRules from '../../../Routes/routeRules';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toggleSubNav } from '../../../Redux/Actions/ToggleSubnavAction';

const menuData = [
	{
		title: 'Copy to use desktop',
		icon: '',
		link: routeRules.dashboard,
		label: 'Dashboard',
		key: 'dashboard',
	},
	{
		title: 'Copy to use group',
		icon: '',
		link: routeRules.usermanagement,
		label: 'Manage Normal Users',
		key: 'manage_users',
	},
	{
		title: 'Copy to use group',
		icon: '',
		link: routeRules.djUserManagement,
		label: 'Manage DJ Users',
		key: 'manage_dj_users',
	},
	{
		title: 'Copy to use group',
		icon: '',
		 link: routeRules.event,
		label: 'Manage Open Events',
		key: 'manage_open_events',
	},
	{
		title: 'Copy to use group',
		icon: '',
		link: routeRules.invitedevent,
		label: 'Manage Invited Events',
		key: 'manage_invited_events',
	},
	{
		title: 'Copy to use desktop',
		icon: '',
		link: routeRules.eventCategory,
		label: 'Manage Event Categories',
		key: 'manage_event_categories',
	},
	{
		title: 'Copy to use desktop',
		icon: '',
		link: routeRules.musicCategory,
		label: 'Manage Music Categories',
		key: 'manage_music_categories',
	},
	{
		title: 'Copy to use list-alt',
		icon: '',
		link: routeRules.contentmanagement,
		label: 'Content Management',
		key: 'manage_pages',
	},
	{
		title: 'Copy to use group',
		icon: '',
		link: routeRules.profile,
		label: 'Profile',
		key: 'manage_profile',
	},
];

class LeftNavigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: menuData,
			activeLink: routeRules.dashboard,
		};
	}

	handleClickMenu = (menuItem) => {
		this.props.history.replace(menuItem.link);
		this.setState((prevState) => ({
			...prevState,
			activeLink: menuItem.link,
		}));
	};

	toggleMenu = (menuItem, i) => {
		let menuClone = [...this.state.menu];
		menuClone[i].open = !menuClone[i].open;
		this.setState({
			menu: menuClone,
			activeLink: menuClone[i].link,
		});
	};

	render() {
		const { menu, activeLink } = this.state;
		console.log('activeLink :=>', activeLink);
		return (
			<div className="dashboard-sidenav-left">
				<div className="dashboard-sidenav-left-menu">
					<div className="app-sidebar sidebar-shadow">
						<div className="scrollbar-sidebar">
							<div className="app-sidebar__inner">
								<ul className="vertical-nav-menu metismenu" onClick={(e) => e.stopPropagation()}>
									{menu.map((menuItem, i) => {
										if (Array.isArray(menuItem.link) && menuItem.link.length > 0) {
											return (
												<li
													key={menuItem.key}
													onClick={() => this.toggleMenu(menuItem, i)}
													className={menuItem.open ? 'mm-active' : ''}
												>
													<a style={{ cursor: 'pointer' }}>
														<i
															className="metismenu-icon fa fa-fw"
															aria-hidden="true"
															title={menuItem.title}
														>
															{menuItem.icon}
														</i>
														{menuItem.label}
														<i className="metismenu-state-icon pe-7s-angle-down caret-left" />
													</a>
													<ul className={menuItem.open ? 'mm-collapse mm-show' : 'mm-collapse'}>
														{menuItem.link.map((subMenuItem, i) => (
															<li
																key={subMenuItem.key}
																onClick={() => this.handleClickMenu(subMenuItem)}
															>
																<a style={{ cursor: 'pointer' }}>
																	<i className="metismenu-icon pe-7s-display2" />
																	{subMenuItem.label}
																</a>
															</li>
														))}
													</ul>
												</li>
											);
										} else {
											return (
												<li key={menuItem.key} onClick={() => this.handleClickMenu(menuItem)}>
													<a
														style={{ cursor: 'pointer' }}
														className={activeLink === menuItem.link ? 'mm-active' : ''}
													>
														<i className="metismenu-icon fa fa-fw" title={menuItem.title}>
															{menuItem.icon}
														</i>
														{menuItem.label}
													</a>
												</li>
											);
										}
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isOpen: state.toggleSubnavReducer.isOpen,
	};
};

export default compose(connect(mapStateToProps, { toggleSubNav }), withRouter)(LeftNavigation);
