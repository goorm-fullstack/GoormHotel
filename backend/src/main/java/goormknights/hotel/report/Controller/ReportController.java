package goormknights.hotel.report.Controller;

import goormknights.hotel.report.Service.ReportService;
import goormknights.hotel.report.dto.request.RequestReportDto;
import goormknights.hotel.report.dto.response.ResponseReportDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    //게시글 신고하기
    @PostMapping("/writeform")
    public ResponseEntity<Object> boardCreateReport(@RequestBody RequestReportDto requestReportDto){
        reportService.reportCreate(requestReportDto);

        return ResponseEntity.ok().build();
    }

    //신고 목록
    @GetMapping("/list")
    public ResponseEntity<List<ResponseReportDto>> gettAllReport() {
        List<ResponseReportDto> reports = reportService.getAllReports();

        return ResponseEntity.ok(reports);
    }
}
