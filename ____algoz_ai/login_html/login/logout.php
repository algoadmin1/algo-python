<?php
        session_start();
        $_SESSION["watchlistLoopThru_running"]    = 0 ;
        $_SESSION["watchlistLoopThruCount"]       = 0;

        session_destroy();
        header("Location: ../login/login.php");
                                                                $ver = "9.12";

?>