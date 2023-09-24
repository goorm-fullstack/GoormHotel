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
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final BoardRepository boardRepository;
    private final ReplyRepository replyRepository;

    //신고 기능(Create)
    public Report reportCreate(RequestReportDto requestReportDto){

        Long boardId = requestReportDto.getBoardId();
        Long replyId = requestReportDto.getReplyId();
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

    //신고 삭제
    public void deletedById(Long reportId){
        boardRepository.deleteById(reportId);
    }

    //신고 삭제 복원
    public Report undeleted(Long reportId){
        Report report = reportRepository.findByReportIdAndReportDelete(reportId, true);
        if(report!=null){
            report.setReportDelete(false);
        }
        return reportRepository.save(report);
    }
}
