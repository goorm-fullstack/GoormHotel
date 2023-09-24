package goormknights.hotel.report.Service;

import goormknights.hotel.board.model.Board;
import goormknights.hotel.board.repository.BoardRepository;
import goormknights.hotel.reply.model.Reply;
import goormknights.hotel.reply.repository.ReplyRepository;
import goormknights.hotel.report.dto.request.RequestReportDto;
import goormknights.hotel.report.dto.response.ResponseReportDto;
import goormknights.hotel.report.model.Report;
import goormknights.hotel.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {

    private final ReportRepository reportRepository;
    private final BoardRepository boardRepository;
    private final ReplyRepository replyRepository;

    //신고 기능(Create)
    public Report reportCreate(RequestReportDto requestReportDto){

        Long boardId = requestReportDto.getBoardId();
        log.info("boardId={}", boardId);
        Long replyId = requestReportDto.getReplyId();
        log.info("replyId={}", replyId);

        if(boardId == null){
            Reply byReplyId = replyRepository.findByReplyIdAndReplyDelete(replyId, false);

            Report report = requestReportDto.toEntity();
            report.setReply(byReplyId);

            Report save = reportRepository.save(report);
            byReplyId.getReport().add(save);

            return save;
        }
        else{
            Board byBoardId = boardRepository.findByBoardIdAndBoardDelete(boardId, false);
            Report report = requestReportDto.toEntity();
            report.setBoard(byBoardId);

            Report save = reportRepository.save(report);
            byBoardId.getReport().add(save);

            return save;
        }


    }

    //신고 조회(Read)
    public List<ResponseReportDto> getAllReports(Pageable pageable) {
        List<Report> all = reportRepository.findAllByReportDelete(false, pageable);
        List<ResponseReportDto> response = new ArrayList<>();

        for (Report report : all) {
            response.add(report.toResponseReportDto());
        }

        return response;
    }

    //신고 완전 삭제
    public void deletedById(Long reportId){
        boardRepository.deleteById(reportId);
    }

    //신고 삭제 복원
    public Report undeleted(Long reportId){
        Report report = reportRepository.findByReportIdAndReportDelete(reportId, true);
        if(report!=null){
            report.setReportDelete(false);
            report.setReportDeleteTime(null);
        }
        return reportRepository.save(report);
    }

    public Report softdeleteReport(Long reportId) {
        Report report = reportRepository.findByReportIdAndReportDelete(reportId, false);

        String datePattern = "yyyy-MM-dd'T'HH:mm:ss";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(datePattern);
        String now = LocalDateTime.now().format(formatter);
        LocalDateTime reportDeleteTime = LocalDateTime.parse(now, formatter);
        report.setReportDelete(true);
        report.setReportDeleteTime(reportDeleteTime);

        return reportRepository.save(report);
    }


    // 신고 게시글 확인 완료 클릭
    public void check(Long reportId, boolean delete){
        Report byReportIdAndReportDelete = reportRepository.findByReportIdAndReportDelete(reportId, delete);

        Report build = Report.builder()
                .reportResult("이상 없음")
                .reportCheck(true)
                .reportWriter(byReportIdAndReportDelete.getReportWriter())
                .reportReason(byReportIdAndReportDelete.getReportReason())
                .reportDate(byReportIdAndReportDelete.getReportDate())
                .reportId(byReportIdAndReportDelete.getReportId())
                .board(byReportIdAndReportDelete.getBoard())
                .reply(byReportIdAndReportDelete.getReply())
                .build();
        reportRepository.save(build);
    }

    // 신고 게시글 블랙 리스트 추가 처리
    public void toBlackList(Long reportId, boolean delete){
        Report byReportIdAndReportDelete = reportRepository.findByReportIdAndReportDelete(reportId, delete);
        String reportWriter = byReportIdAndReportDelete.getReportWriter();
        // reportWriter를 이용하여 member 정보를 가져오고 memberService의 블랙리스트 추가 로직 사용

        Report build = Report.builder()
                .reportResult("블랙리스트")
                .reportCheck(true)
                .reportWriter(byReportIdAndReportDelete.getReportWriter())
                .reportReason(byReportIdAndReportDelete.getReportReason())
                .reportDate(byReportIdAndReportDelete.getReportDate())
                .reportId(byReportIdAndReportDelete.getReportId())
                .board(byReportIdAndReportDelete.getBoard())
                .reply(byReportIdAndReportDelete.getReply())
                .build();
        reportRepository.save(build);
    }
}
