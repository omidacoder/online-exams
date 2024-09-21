<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script>
        </script>
        <link rel="stylesheet" href="/css/app.css">
        <title>پنل دانش آموز</title>

    </head>
    <body >
    <div id="student_panel_container"></div>
    @if(isset($payment))
        <!-- The Modal -->
        <div id="myModal" class="modal">

            <!-- Modal content -->
            <div class="modal-content" id="my-modal">
                <span class="close" id="modal-close" onClick="document.getElementById('myModal').style.display = 'none';">&times;</span>
                @if($payment == 'success')
                <p style="text-align:right">هزینه آزمون با موفقیت پرداخت شد میتوانید از بخش آزمون ها اقدام به شروع آزمون کنید</p>
                    @else
                    <p style="text-align:right">پرداخت نا موفق بود</p>
                    @endif
            </div>

        </div>
    @endif
    @if(isset($ended))
    <!-- The Modal -->
        <div id="myModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content" id="my-modal">
        <span class="close" id="modal-close" onClick="document.getElementById('myModal').style.display = 'none';">&times;</span>
        <p style="text-align:right">آزمون شما با موفقیت پایان یافت جهت دریافت نتیجه ی آزمون خود به بخش آزمون ها مراجعه کنید</p>
        </div>

        </div>
        @endif
        <script src="/js/app.js?version=1.1.9" ></script>
    </body>
<?php session()->forget('payment'); ?>
</html>
