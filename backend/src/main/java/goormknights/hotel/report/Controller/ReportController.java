package goormknights.hotel.report.Controller;

import goormknights.hotel.report.Service.ReportService;
import goormknights.hotel.report.dto.request.RequestReportDto;
import goormknights.hotel.report.dto.response.ResponseReportDto;
import goormknights.hotel.report.model.Report;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    //게시글, 댓글 신고하기
    @PostMapping("/writeform")
    public ResponseEntity<Object> boardCreateReport(@RequestBody RequestReportDto requestReportDto){
        reportService.reportCreate(requestReportDto);

        return ResponseEntity.ok().build();
    }

    //신고 목록
    @GetMapping("/list")
    public ResponseEntity<List<ResponseReportDto>> getAllReport(@PageableDefault(size = 10, sort = "reportId", direction = Sort.Direction.DESC) Pageable pageable) {
        List<ResponseReportDto> reports = reportService.getAllReports(pageable);

        return ResponseEntity.ok(reports);
    }

    //신고 완전 삭제
    @DeleteMapping("/{reportId}")
    public void deleteReport(@PathVariable Long reportId){
        reportService.deletedById(reportId);
    }

    //신고 삭제 복원
    @PutMapping("/undelete/{reportId}")
    public ResponseEntity<ResponseReportDto> undeleted(@PathVariable Long reportId){
        Report report = reportService.undeleted(reportId);

        return ResponseEntity.ok(report.toResponseReportDto());
    }

    //신고 소프트딜리트
    @PutMapping("/softdelete/{reportId}")
    public ResponseEntity<Object> softdeleteReport(@PathVariable Long reportId) {
        Report report = reportService.softdeleteReport(reportId);

        return ResponseEntity.ok(report.toResponseReportDto());
    }


    //신고 게시글 확인 완료
    @PutMapping("/check/{reportId}")
    public ResponseEntity<Object> check(@PathVariable Long reportId){
        reportService.check(reportId);

        return ResponseEntity.ok().build();
    }

    // 신고 게시글 블랙리스트 처리
    @PutMapping("/black/{reportId}")
    public ResponseEntity<Object> black(@PathVariable Long reportId){
        reportService.toBlackList(reportId);

        return ResponseEntity.ok().build();
    }
}
