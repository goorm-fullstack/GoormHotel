package goormknights.hotel.report.repository;

import goormknights.hotel.report.model.Report;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findAllByReportDelete(boolean bool, Pageable pageable);

    Report findByReportIdAndReportDelete(Long reportId, boolean bool);

}
