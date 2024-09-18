import { useState } from "react";
import PostComments from "./PostComments";
import PostContent from "./PostContent";
import postData from "../postData";

export default function DebatePost() {
  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir. 
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/

  const [comments, setComments] = useState(postData.comments);

  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() && !isAnonymous) {
      alert("Lütfen kullanıcı adı giriniz.");
      return;
    }
    if (!comment.trim()) {
      alert("Lütfen yorum giriniz.");
      return;
    }

    const newComment = {
      id: crypto.randomUUID(),
      userName: isAnonymous ? "AnonimKullanıcı" : username,
      isAnonymous,
      commentText: comment,
    };

    setComments([...comments, newComment]);

    setUsername("");
    setComment("");
    setIsAnonymous(false);
  };

  return (
    <div className="post-container">
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          placeholder="Kullanıcı adı girin."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Ne düşünüyorsunuz?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <label>
          <input
            className="checkbox"
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          İsimsiz mi göndereyim?
        </label>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
}
