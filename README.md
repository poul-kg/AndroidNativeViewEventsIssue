# AndroidNativeViewEventsIssue

Hi,

I am using Mapview and other UI components in one screen. But when Mapview is loaded, it covers full screen and no other components is showing above map. So I added GraphicsView in NativeViewHost  and load all UI components in it.

Now I am facing many problems like:
1.	Views are not taking touch input in Android. (Solution: Add GraphicsView in Button. But now, I have to add Padding for components because Button is taking default padding in Android.) This issue was already [published in public forums](https://www.fusetools.com/community/forums/bug_reports/getting_click_events_from_element_on_top_of_map_vi). This is the primary issue which creates more issues along the road.
2.	When keyboard is open, View is not showing properly.( Click on Bottom Right up arrow icon and Location card will be open. After that click on TextInput, when keyboard will open, Location card UI looks sticky.)

Note: Please add your Google Project API key to run project

<img src="https://firebasestorage.googleapis.com/v0/b/lifeai-8548e.appspot.com/o/tmp%2FGitHub%2FScreenshot_20180122-204338.png?alt=media&token=8fffb855-3b34-463d-91cc-1e5a8142b9c1" height="300" />

<img src="https://firebasestorage.googleapis.com/v0/b/lifeai-8548e.appspot.com/o/tmp%2FGitHub%2FScreenshot_20180122-210255.png?alt=media&token=1b67a7e1-e888-44f9-bd2d-5caf7ef096f8" height="300" />
