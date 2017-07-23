<?php 

/**
 * The home page of the site.
 */

// Get the basename of the file, i.e. anything before the .php
// Use that as the pagename for templating purposes.
$page = basename(__FILE__);
$page = substr( $page, 0, strrpos($page, '.') );

?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7 no-js" lang="en">
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8 no-js" lang="en">
<![endif]-->
<!--[if !(IE 7) | !(IE 8) ]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->
<head>
	<title><?php echo $page ?> | SITE_NAME</title>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="DESCRIPTION">

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/style.min.css">

	<?php 
  	/**
  	 * Replace the .no-js class on the <html> element if JS enabled. 
  	 * This runs in the header because UI may depend on it and we don't want a FOUC.
  	 * @see https://en.wikipedia.org/wiki/Flash_of_unstyled_content
  	 *
  	 * Also minified, as we will not need to modify in the future.
  	 */
  ?>
  <script type="text/javascript">document.documentElement.className=document.documentElement.className.replace("no-js","js");</script>

	<!--[if IE]>
	  <script src="js/html5shiv.js"></script>
  <![endif]-->
</head>
<body>

	<?php include_once 'header.php'; ?>

	<main class="content" role="main">
		<div class="container">
			
			
		
		</div>
	</main>

	<?php include_once 'footer.php'; ?>

</body>
</html>
