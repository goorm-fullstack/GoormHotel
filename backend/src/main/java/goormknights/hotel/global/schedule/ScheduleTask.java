package goormknights.hotel.global.schedule;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ScheduleTask {
    // 매달 1일에 멤버에게 쿠폰을 발행할 스케쥴러입니다.
    @Scheduled(cron = "0 0 0 1 * ?")
    public void specificDateTask() {
    }
}
