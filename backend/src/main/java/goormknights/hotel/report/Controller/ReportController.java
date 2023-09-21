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

    @PostMapping("/writeform")
    public ResponseEntity<Object> createReport(@RequestBody RequestReportDto requestReportDto){
        reportService.create(requestReportDto);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<ResponseReportDto>> gettAllReport() {
        List<ResponseReportDto> reports = reportService.getAllReports();

        return ResponseEntity.ok(reports);
    }
}
