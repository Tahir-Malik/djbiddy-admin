import loadable from '@loadable/component';
import routeRules from './routeRules';
const routesData = [
	{
		path: routeRules.landingPage,
		component: loadable(() => import('../Container/Login')),
		auth: false,
		exact: true,
	},
	{
		path: routeRules.termsandconditions,
		component: loadable(() => import('../Container/termsandconditions')),
		auth: false,
		exact: true,
	},
	{
		path: routeRules.dashboard,
		component: loadable(() => import('../Container/Dashboard')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.usermanagement,
		component: loadable(() => import('../Container/Usermanagement')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.userdetails,
		component: loadable(() => import('../Container/UserDetails')),
		auth: true,
		exact: true,
	},
	// {
	// 	path: routeRules.eventcategorymanagement,
	// 	component: loadable(() => import('../Container/EventCategory')),
	// 	auth: true,
	// 	exact: true,
	// },
	// {
	// 	path: routeRules.musiccategorymanagement,
	// 	component: loadable(() => import('../Container/Categories')),
	// 	auth: true,
	// 	exact: true,
	// },
	{
		path: routeRules.profile,
		component: loadable(() => import('../Container/Profile/index')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.contentmanagement,
		component: loadable(() => import('../Container/ContentManagement')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.addoredituser,
		component: loadable(() => import('../Container/Usermanagement/AddorEditUser')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.forget,
		component: loadable(() => import('../Container/forgetpass')),
		auth: false,
		exact: true,
	},
	{
		path: routeRules.resetpassword,
		component: loadable(() => import('../Container/resetpassword')),
		auth: false,
		exact: true,
	},
	{
		path: routeRules.challengemanagement,
		component: loadable(() => import('../Container/Challengemanagement')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.userchallengemanagement,
		component: loadable(() => import('../Container/UserChallengemanagement')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.postmanagement,
		component: loadable(() => import('../Container/Postmanagement')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.postdetails,
		component: loadable(() => import('../Container/Postmanagement/postDetails')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.userchallengedetails,
		component: loadable(() => import('../Container/UserChallengemanagement/challengeDetails')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.eventCategory,
		component: loadable(() => import('../Container/EventCategoryManagement')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.event,
		component: loadable(() => import('../Container/EventManagement')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.invitedevent,
		component: loadable(() => import('../Container/InvitEventmanagement')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.musicCategory,
		component: loadable(() => import('../Container/MusicCategoryManagement')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.addoreditEventCategory,
		component: loadable(() =>
			import('../Container/EventCategoryManagement/AddorEditEventCategory')
		),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.addoreditEvent,
		component: loadable(() =>
			import('../Container/EventManagement/AddorEditEventCategory')
		),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.addoreditMusicCategory,
		component: loadable(() =>
			import('../Container/MusicCategoryManagement/AddorEditMusicCategory')
		),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.djUserManagement,
		component: loadable(() => import('../Container/DjUserManagement')),
		auth: true,
		exact: true,
	},
	{
		path: routeRules.djUserDetails,
		component: loadable(() => import('../Container/DjUserDetails')),
		auth: true,
		exact: true,
	},
];

export default routesData;
