var events = [
{
  title: 'Park Party',
  start : '2019-02-20'
},
{
  title  : 'Grand Opening Sale',
  start  : '2019-02-04',
  end    : '2019-02-08'
}]

$("submit").submit(function(){
	this.preventDefault();
	var title = $("#title").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	return false;
});