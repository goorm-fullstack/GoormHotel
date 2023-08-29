package goormknights.hotel.board;

import goormknights.hotel.auth.model.Member;
import jakarta.persistence.*;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Setter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private Long price;
    private String desc;

    @ManyToOne
    @JoinColumn
    private Member member;

    @Builder
    public Board(String name, Long price, String desc, Member member) {
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.member = member;
    }

//    public void edit(ItemEditor itemEditor) {
//        name = itemEditor.getName();
//        price = itemEditor.getPrice();
//        desc = itemEditor.getDesc();
//    }
//
//    public ItemEditor.ItemEditorBuilder toEditor() {
//        return ItemEditor.builder()
//                .name(getName())
//                .price(getPrice())
//                .desc(getDesc());
//    }

    // 특정 유저의 id 비교, 찾기에 활용
    public Integer getMeberId(){
        return this.member.getId();
    }
}
