import Image from 'next/image';
import styles from '../../styles/details.module.css';

const HotelGallery = () => {
  return (
    <div className={styles["gallery"]}>
      <div className={styles["gallery__grid"]}>
        <button className={`${styles["gallery__arrow"]} ${styles["gallery__arrow--left"]}`}>
          <Image 
            src="/images/details/Previous Image Arrow.svg" 
            alt="Previous" 
            width={24}
            height={24}
          />
        </button>

        <div className={styles["gallery__large-image"]}>
          <Image 
            src="/images/details/Main Image.png" 
            alt="Main image" 
            width={800}
            height={450}
          />
        </div>

        <button className={`${styles["gallery__arrow"]} ${styles["gallery__arrow--right"]}`}>
          <Image 
            src="/images/details/Vector (1).svg" 
            alt="Next" 
            width={24}
            height={24}
          />
        </button>

        <div className={styles["gallery__small-images"]}>
          <div className={styles["small-image"]}>
            <Image 
              src="/images/details/Image 1.png" 
              alt="Pool view" 
              width={150}
              height={100}
            />
          </div>
          <div className={styles["small-image"]}>
            <Image 
              src="/images/details/Image 2.png" 
              alt="Hotel exterior" 
              width={150}
              height={100}
            />
          </div>
          <div className={styles["small-image"]}>
            <Image 
              src="/images/details/Image 3.png" 
              alt="Room interior" 
              width={150}
              height={100}
            />
          </div>
          <div className={styles["gallery__more-wrapper"]}>
            <Image 
              src="/images/details/Image 4.png" 
              alt="Room interior" 
              width={150}
              height={100}
            />
            <span className={styles["gallery__more-badge"]}>
              <Image 
                src="/icons/Vector.svg" 
                alt="Gallery Icon" 
                width={12}
                height={12}
              />
              48+
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelGallery;
