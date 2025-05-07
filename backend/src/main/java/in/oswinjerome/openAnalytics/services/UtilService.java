package in.oswinjerome.openAnalytics.services;


import java.time.LocalDateTime;

public class UtilService {

    public static LocalDateTime[] fromShortString(String shortString) {

        LocalDateTime[] localDateTime = new LocalDateTime[2];
        LocalDateTime now = LocalDateTime.now();

        switch (shortString){
            case "all":
                localDateTime[0] = LocalDateTime.now().minusYears(10); //FIXME: Not a good idea
                localDateTime[1] = LocalDateTime.now();
                break;
            case "12hrs":
                localDateTime[0] = now.minusHours(12);
                localDateTime[1] = now;
                break;
            case "1hr":
                localDateTime[0] = now.minusHours(1);
                localDateTime[1] = now;
                break;
            case "1year":
                localDateTime[0] = now.minusYears(1);
                localDateTime[1] = now;
                break;
            case "6months":
                localDateTime[0] = now.minusMonths(6);
                localDateTime[1] = now;
                break;
            case "30days":
                localDateTime[0] = now.minusDays(30);
                localDateTime[1] = now;
                break;
            case "7days":
                localDateTime[0] = now.minusDays(7);
                localDateTime[1] = now;
                break;
            case "30mins":
                localDateTime[0] = now.minusMinutes(30);
                localDateTime[1] = now;
                break;
            case "10mins":
                localDateTime[0] = now.minusMinutes(10);
                localDateTime[1] = now;
                break;
            case "5mins":
                localDateTime[0] = now.minusMinutes(5);
                localDateTime[1] = now;
                break;

            default: // handles 24hrs
                localDateTime[0] = now.minusHours(24);
                localDateTime[1] = now;
                break;


        }


        return localDateTime;
    }

}
