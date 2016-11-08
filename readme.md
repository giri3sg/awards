<div class="md-input-no-margin">
  <md-content layout="row" layout-align="center center">
    <md-card>
      <form class="form-inline">
        <div class="form-group">
          <div class="input-group">
            <input type="text" class="form-control"  placeholder="New Category" ng-model="newCategory">
            <div class="input-group-addon md-primary"  md-ink-ripple class="md-clickable" ng-click="add(newCategory)" >+</div>
          </div>
        </div>
      </form>
    </md-card>
  </md-content>
  <div layout="row" layout-xs="column" layout-padding="" layout-wrap="">
    <md-card ng-repeat="(key, value) in categories" flex-gt-xs="45" flex-xs="100" flex="none">
      <md-input-container >
        <label ></label>
        <input required md-no-asterisk name="Category" ng-model="key">
      </md-input-container>
      <div>
        <form class="form-inline">
          <div class="form-group">
            <div class="input-group" ng-repeat="subcat in value">
              <input type="text" class="form-control" ng-model="subcat">
              <div class="input-group-addon md-primary"  md-ink-ripple class="md-clickable" ng-click="addSub(key,newSub)" >
                X
              </div>
            </div>
            <div class="input-group">
              <input type="text" class="form-control"  placeholder="Sub Category" ng-model="newSub">
              <div class="input-group-addon md-primary"  md-ink-ripple class="md-clickable" ng-click="addSub(key,newSub)" >+</div>
            </div>
          </div>
        </form>
        <div class="pull-right"><i class="material-icons">clear</i></div>
      </div>
    </md-card>
  </div>
  <div>
    <section layout="row" layout-sm="column" layout-align="end center" layout-wrap>
      <md-button class="md-fab md-primary" ng-click="save(categories)" aria-label="Save">
        <md-tooltip md-direction="top">Save</md-tooltip>
        <i class="fa fa-lg fa-save"></i>
      </md-button>
    </section>
  </div>
</div>
{
  categories: [
    {
      name:"cat1"
      subcat:["sub1","sub2"]
    },
    {
      name:"cat1"
      subcat:["sub1","sub2"]
    }
  ]
}