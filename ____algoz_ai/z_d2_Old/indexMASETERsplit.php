<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="style_d2.css">
    <title>algoz dashboard</title>
</head>

<body>

    <!-- Sidebar     https://blade-ui-kit.com/blade-icons/gameicon-chess-knight                     ver 4.1 -->
    <div class="sidebar">
        <a href="#" class="logo">
            <i class='bx bx-analyse'></i>
            <div class="logo-name"><span>algoz</span>.ai</div>
        </a>
        <ul class="side-menu">
            <li><a href="#"><i class='bx bxs-dashboard'></i>Dashboard</a></li>
            <!-- <li><a href="#"><i class='bx bx-store-alt'></i>Price Levels</a></li> -->
            <li><a href="#"><i class='bx bx-vertical-bottom'></i>Price Levels</a></li>
            <li class="active"><a href="#"><i class='bx bx-math'></i>Covered Call Calc</a></li>
            <!-- <li><a href="#"><i class='bx bx-analyse'></i>BuySell Signals</a></li> -->
            <li><a href="#"><i class='bx bx-line-chart'></i>BuySell Signals</a></li>
            <li><a href="#"><i class='bx bx-candles'></i>Charting</a></li>
            <!-- <li><a href="#"><i class='bx bx-mail-send'></i>Newsletter</a></li> -->
            <li><a href="#"><i class='bx bx-news'></i>Newsletter</a></li>
            <li><a href="#"><i class='bx bx-fast-forward-circle'></i>Fintech FasterClass</a></li>
            <li><a href="#"><i class='bx bx-search'></i>ai Prompt</a></li>
            <li><a href="#"><i class='bx bx-phone-outgoing'></i>Book Call</a></li>

            <!-- <li><a href="#"><i class='bx bx-group'></i>Users</a></li> -->
            <li><a href="#"><i class='bx bx-health'></i>BMI Calc</a></li>
            <li><a href="#"><i class='bx bx-heart'></i>Fitness FasterClass</a></li>
            <!-- <li><a href="#"><i class='bx bx-group'></i>Fitness</a></li> -->
            <!-- <li><a href="#"><i class='bx bx-cog'></i>Settings</a></li> -->
        </ul>
        <ul class="side-menu">
            <li>
                <a href="#" class="logout">
                    <i class='bx bx-log-out-circle'></i>
                    Logout
                </a>
            </li>
        </ul>
    </div>
    <!-- End of Sidebar -->

    <!-- Main Content -->
    <div class="content">
        <!-- Navbar -->
        <nav>
            <i class='bx bx-menu'></i>
            <form action="#">
                <div class="form-input">
                    <input type="search" placeholder="Search...">
                    <button class="search-btn" type="submit"><i class='bx bx-search'></i></button>
                </div>
            </form>
            <input type="checkbox" id="theme-toggle" hidden>
            <label for="theme-toggle" class="theme-toggle"></label>
<!-- 
            <a href="#" class="notif">
                <i class='bx bx-bell'></i>
                <span class="count">12</span>
            </a>
             -->
             <div class="info">
                <p>Hey, <b>Rogue</b></p>
                <small class="text-muted">Creator</small>
            </div>
            <a href="#" class="profile">
                <img src="images/logo_d2.png">
            </a>
        </nav>

        <!-- End of Navbar -->

        <main>
            <div class="header">
                <div class="left">
                    <h1>Your Dashboard</h1>

<!--                     
                    <ul class="breadcrumb">
                        <li><a href="#">
                                Analytics
                            </a></li>
                        /
                        <li><a href="#" class="active">Shop</a></li>
                    </ul> -->


                </div>
                <a href="#" class="report">
                    <i class='bx bx-cloud-download'></i>
                    <span>Download Guide</span>
                </a>
            </div>

            <!-- Insights -->
            <ul class="insights">
                <!-- <li>
                    <i class='bx bx-line-chart'></i>
                    <span class="info">
                        <h3>
                            $487.52
                        </h3>
                        <p>QQQ</p>
                    </span>
                </li>
                 -->
                <li><i class='bx bxl-apple'></i>
                    <!-- bx-show-alt -->
                    <span class="info">
                        <h3>
                            $224.50
                        </h3>
                        <p>AAPL</p>
                    </span>
                </li>
                <!-- <li><i class='bx bx-line-chart'></i> -->
                    <li><i class='bx bxl-meta'></i>
                        <span class="info">
                        <h3>
                            $589.45
                            <!-- <?php $content = file_get_contents('https://algoz.ai/rtq/rtq.php?sym=meta');  echo content; ?> -->
                        </h3>
                        <p>META</p>
                    </span>
                </li>
                <li><i class='bx bx-line-chart'></i>
                    <span class="info">
                        <h3>
                            $130.87
                        </h3>
                        <p>NVDA</p>
                    </span>
                </li>
            </ul>
            <!-- End of Insights -->

            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <i class='bx bx-receipt'></i>
                        <h3>Recent Quotes</h3>
                        <!-- <i class='bx bx-filter'></i>
                        <i class='bx bx-search'></i> -->
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Stock</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="../img/aapl.png">
                                    <p>AAPL</p>
                                </td>
                                <td>10-08-24</td>
                                <td><span class="status completed">Trending UP</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="../img/nvda.png">
                                    <p>NVDA</p>
                                </td>
                                <td>10-08-24</td>
                                <td><span class="status pending">Consolidating</span></td>
                            </tr> <tr>
                                <td>
                                    <img src="../img/meta.png">
                                    <p>META</p>
                                </td>
                                <td>10-08-24</td>
                                <td><span class="status process">Trending DOWN</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="../img/gs.png">
                                    <p>GS</p>
                                </td>
                                <td>10-08-24</td>
                                <td><span class="status completed">Trending UP</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Reminders -->
                <div class="reminders">
                    <div class="header">
                        <i class='bx bx-note'></i>
                        <h3>Upcoming Events</h3>
                        <!-- <i class='bx bx-filter'></i> -->
                        <!-- <i class='bx bx-plus'></i> -->
                    </div>
                    <ul class="task-list">
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Oct 31st AAPL Earnings</p>
                            </div>
                            <!-- <i class='bx bx-dots-vertical-rounded'></i> -->
                        </li>
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Nov 5th US Presidential Election</p>
                            </div>
                            <!-- <i class='bx bx-dots-vertical-rounded'></i> -->
                        </li>
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p> Nov 7th FMOC Meeting</p>
                            </div>
                            <!-- <i class='bx bx-dots-vertical-rounded'></i> -->
                        </li>
                        <!-- <li class="not-completed"> -->
                        <li class="completed">
                                <div class="task-title">
                                    <!-- <i class='bx bx-x-circle'></i> -->
                                    <i class='bx bx-check-circle'></i>
                                    <!-- <i class='bx bx-x-circle'></i> -->
                                    <p>Dec 18th FMOC Meeting</p>
                            </div>
                            <!-- <i class='bx bx-dots-vertical-rounded'></i> -->
                        </li>
                    </ul>
                </div>

                <!-- End of Reminders-->

            </div>

        </main>

    </div>

    <script src="index_d2.js"></script>
</body>

</html>