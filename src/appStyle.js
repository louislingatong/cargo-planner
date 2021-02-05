const drawerWidth = 240;

const appStyle = (theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    marginRight: theme.spacing(2)
  },
  searchField: {
    flexGrow: 1,
    marginRight: theme.spacing(2)
  },
  loadButton: {
    marginRight: theme.spacing(2)
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  loading: {
    marginTop: theme.mixins.toolbar
  }
});

export default appStyle;