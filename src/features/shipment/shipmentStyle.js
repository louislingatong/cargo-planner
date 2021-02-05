const shipmentStyle = (theme) => ({
  root: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  shipmentName: {
    marginBottom: theme.spacing(1)
  },
  email: {
    marginBottom: theme.spacing(4)
  },
  totalCargoBays: {
    marginBottom: theme.spacing(4)
  },
  cargoBoxesField: {
    width: '500px'
  }
});

export default shipmentStyle;