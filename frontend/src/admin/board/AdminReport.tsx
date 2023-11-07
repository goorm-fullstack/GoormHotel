import React, { useEffect, useState } from 'react';
import * as S from './Style';
import AdminLayout from '../common/AdminLayout';
import { PageTitle, InputCheckbox, BtnWrapper, NormalBtn } from '../../Style/commonStyles';
import { Container, Table, TableHeader } from '../member/Style';
import Paging from '../../components/common/Paging/Paging';
import { ReportData } from './AdminBoard';
import { useNavigate, Link } from 'react-router-dom';
import { boardTitleList } from './AdminBoard';
import Instance from '../../utils/api/axiosInstance';
import AdminCheck from '../adminCheck';

const AdminReport = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [report, setReport] = useState<ReportData[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const navigate = useNavigate();
  const authItem = localStorage.getItem('auth');
  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };

  useEffect(() => {
    Instance.get('/report/list')
      .then((response) => {
        // 데이터를 가져올 때 reportCheck와 reportResult를 문자열로 처리
        const modifiedData: ReportData[] = response.data.map((item: ReportData) => ({
          ...item,
          reportCheck: item.reportCheck.toString(),
          reportResult: item.reportResult.toString(),
        }));
        const totalPages = parseInt(response.headers['totalpages'], 10);
        const totalData = parseInt(response.headers['totaldata'], 10);
        setReport(modifiedData);
        setTotalPage(totalPages);
        setTotalData(totalData);
        console.log('get 성공');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked: boolean = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const allMemberIds = report.map((item) => item.reportId);
      setCheckedItems(allMemberIds);
    } else {
      setCheckedItems([]);
    }
  };

  const checkedBoard = () => {
    checkedItems.forEach((boardId) => {
      Instance.put(`/report/check/${boardId}`)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  };

  const handleCheckboxChange = (memberId: number) => {
    const updatedCheckedItems = checkedItems.includes(memberId) ? checkedItems.filter((id) => id !== memberId) : [...checkedItems, memberId];

    setCheckedItems(updatedCheckedItems);
    setSelectAllChecked(updatedCheckedItems.length === report.length);
  };

  const [reportDetails, setReportDetails] = useState<Record<number, { boardTitle: string; boardId: number }>>({});
  const fetchBoardDetails = (replyId: number) => {
    if (replyId !== null && typeof replyId !== 'undefined') {
      // Check if replyId is valid
      Instance.get(`reply/replyId/${replyId}`)
        .then((response1) => {
          const boardId = response1.data.boardId;
          const replyContent = response1.data.replyContent;
          Instance.get(`/boards/${boardId}`)
            .then((response2) => {
              const boardTitle = response2.data.boardTitle;
              setReportDetails((prevState) => ({
                ...prevState,
                [replyId]: { boardTitle, boardId, replyContent },
              }));
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  console.log(report);

  const handleAddBlackList = () => {
    checkedItems.forEach((reportId) => {
      Instance.get(`/report/find/${reportId}`)
        .then((response) => {
          const report = response.data;
          if (report.boardId) {
            Instance.get(`boards/${report.boardId}`)
              .then((response) => {
                const board = response.data;
                if (board.boardPassword != null) {
                  const isConfirm = window.confirm('비회원 게시글입니다. 삭제하시겠습니까?');
                  if (isConfirm) {
                    Instance.put(`/report/black/${reportId}`)
                      .then(() => {
                        Instance.put(`/boards/softdelete/${board.boardId}`)
                          .then(() => {})
                          .catch(() => {
                            console.log('게시글 삭제 실패');
                          });
                      })
                      .catch(() => {
                        console.log('게시글 블랙리스트 상태 변경 실패');
                      });
                    // Instance.put(`/boards/softdelete/${board.boardId}`)
                    //   .then(() => {
                    //     Instance.put(`/report/black/${reportId}`)
                    //     .then(() => {
                    //       alert("블랙리스트 상태 변경 성공");
                    //     })
                    //     .catch(() => {
                    //       alert("블랙리스트 상태 변경 실패");
                    //     })
                    //     alert("삭제 완료");
                    //   })
                    //   .catch(() => {
                    //     alert("삭제 실패");
                    //   })
                  }
                } else {
                  Instance.get(`/member/${board.boardWriter}`)
                    .then((response) => {
                      const member = response.data;
                      Instance.post(`/member/blacked/${member}`)
                        .then(() => {
                          Instance.put(`/report/black/${reportId}`)
                            .then(() => {
                              console.log('게시글글 블랙리스트 추가 성공');
                            })
                            .catch(() => {
                              console.log('게시글글 블랙리스트 추가 실패');
                            });
                        })
                        .catch(() => {
                          console.log('게시글글글 블랙리스트 추가 실패');
                        });
                    })
                    .catch((e) => {
                      console.log(e.message);
                    });
                }
              })
              .catch((e) => {
                console.error(e.message);
              });
          }
          if (report.replyId) {
            Instance.get(`reply/replyId/${report.replyId}`).then((response) => {
              const reply = response.data;
              if (reply.replyPassword) {
                const isConfirm = window.confirm('비회원 댓글입니다. 삭제하시겠습니까?');
                if (isConfirm) {
                  Instance.put(`/reply/softdelete/${reply.replyId}`)
                    .then(() => {
                      Instance.put(`report/black/${reportId}`)
                        .then(() => {
                          console.log('댓글 블랙리스트 성공');
                        })
                        .catch(() => {
                          console.log('댓글 블랙리스트 실패');
                        });
                    })
                    .catch(() => {
                      console.log('댓글 삭제 실패');
                    });
                }
              } else {
                Instance.get(`/member/${reply.replyWriter}`)
                  .then((response) => {
                    const member = response.data;
                    Instance.post(`/member/blacked/${member}`).then(() => {
                      Instance.put(`report/black/${reportId}`)
                        .then(() => {
                          console.log('댓글 블랙리스트 추가 성공');
                        })
                        .catch(() => {
                          console.log('댓글 블랙리스트 추가 실패');
                        });
                    });
                  })
                  .catch(() => {
                    console.log('댓글 블랙리스트 추가 실패');
                  });
              }
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  useEffect(() => {
    report.forEach((reportItem) => {
      if (reportItem.replyId !== null && !reportDetails[reportItem.replyId]) {
        fetchBoardDetails(reportItem.replyId);
      }
    });
  }, [report, reportDetails]);

  return (
    <AdminLayout subMenus="board">
      <Container>
        <PageTitle>신고 관리</PageTitle>
        <TableHeader>
          <p className="total">
            전체 <strong>{totalData}</strong> 건
          </p>
          <BtnWrapper className="flexgap right">
            <NormalBtn className="header" onClick={checkedBoard}>
              확인(이상 없음)
            </NormalBtn>
            <NormalBtn className="header red" onClick={handleAddBlackList}>
              블랙리스트 추가
            </NormalBtn>
          </BtnWrapper>
        </TableHeader>
        <Table>
          <colgroup>
            <col width="80px" />
            <col width="100px" />
            <col width="200px" />
            <col width="200px" />
            <col width="auto" />
            <col width="200px" />
            <col width="150px" />
            <col width="150px" />
          </colgroup>
          <thead>
            <tr>
              <th>
                <InputCheckbox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              </th>
              <th>번호</th>
              <th>신고된 글</th>
              <th>신고 작성자 명</th>
              <th>신고사유</th>
              <th>신고일</th>
              <th>확인여부</th>
              <th>처리 결과</th>
            </tr>
          </thead>
          <tbody>
            {report.length === 0 && (
              <tr>
                <td colSpan={8} className="center empty">
                  신고된 글이 없습니다.
                </td>
              </tr>
            )}
            {report.length > 0 &&
              report.map((report, idx) => (
                <tr key={report.reportId}>
                  <td className="center">
                    <InputCheckbox
                      type="checkbox"
                      checked={checkedItems.includes(report.reportId)}
                      onChange={() => handleCheckboxChange(report.reportId)}
                      // checked={checkedItems.includes(item.memberId)}
                      // onChange={() => handleCheckboxChange(item.memberId)}
                    />
                  </td>
                  <td className="center">{totalData - idx}</td>
                  <td className="center commonetwrap">
                    {report.replyId == null ? (
                      <Link
                        className="u"
                        to={`/admin/board/${boardTitleList.find((item) => item.board === report.boardTitle)?.english}/detail/${report.boardId}`}>
                        {report.title}
                      </Link>
                    ) : report.boardId == null ? (
                      <>
                        <S.CommentText>{truncateString(report.replyContent, 8)}</S.CommentText>
                        <S.ModalContainer>
                          <S.ModalContent>{report.replyContent}</S.ModalContent>
                        </S.ModalContainer>
                      </>
                    ) : (
                      '신고된 내용이 없습니다.'
                    )}
                  </td>
                  <td className="center">
                    {report.reportWriter}
                    {/*<LinkStyle to={`/admin/member/${item.author.id}`}>({item.author.id})</LinkStyle>*/}
                  </td>
                  <td className="center">{report.reportReason}</td>
                  <td className="center">{`${report.reportDate[0]}/${report.reportDate[1] < 10 ? '0' : ''}${report.reportDate[1]}/${
                    report.reportDate[2] < 10 ? '0' : ''
                  }${report.reportDate[2]}`}</td>
                  <td className="center">{report.reportResult}</td>
                  {(() => {
                    switch (report.reportResult) {
                      case '이상 없음':
                        return <td className="center">Y</td>;
                      case '처리 중':
                        return <td className="center">N</td>;
                      default:
                        return <td className="center">Y</td>;
                    }
                  })()}
                </tr>
              ))}
          </tbody>
        </Table>
        <Paging totalPage={totalPage} />
      </Container>
      <AdminCheck kind="AUTH_C" />
    </AdminLayout>
  );
};

export default AdminReport;
