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
            Reply byReplyId = replyRepository.findByReplyId(replyId);

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
    public List<ResponseReportDto> getAllReports() {
        List<Report> all = reportRepository.findAll();
        List<ResponseReportDto> response = new ArrayList<>();

        for (Report report : all) {
            response.add(report.toResponseReportDto());
        }

        return response;
    }
}
