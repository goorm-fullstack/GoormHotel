package goormknights.hotel.auth.config;

import goormknights.hotel.global.exception.BoardNotFound;
import goormknights.hotel.board.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;

import java.io.Serializable;

@Slf4j
@RequiredArgsConstructor
public class GoormHotelPermissionEvaluator implements PermissionEvaluator {

    private final BoardRepository boardRepository;

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        return false;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        var memberPrincipal = (MemberPrincipal) authentication.getPrincipal();

        var board = boardRepository.findById((Integer) targetId)
                .orElseThrow(BoardNotFound::new);

        if(!board.getMeberId().equals(memberPrincipal.getMemberId())){
            log.error("[인가 실패] 해당 사용자가 작성한 글이 아닙니다. targetId={}", targetId);
            return false;
        }

        return true;
    }
}
