import { Button } from '@material-tailwind/react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

    const navigate = useNavigate();

    return (
        <section className='w-[100%] lg:[100vw] flex items-center text-center flex-col gap-5 pt-6'>
            <h3 className='w-[60%] lg:w-[50%]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, illo! Iusto excepturi dolor consequatur laudantium expedita ut culpa eaque labore. Labore a corporis ut totam recusandae animi eos quas sed.
                Veritatis mollitia quis sequi aliquam, hic fugiat illum nobis quam explicabo libero obcaecati placeat quae tempore. Nemo illo odit porro quae enim beatae asperiores, numquam pariatur atque autem iusto natus!
                Id placeat quam officiis maiores doloremque minus consectetur ad explicabo nesciunt! Reprehenderit soluta iure repellat repellendus beatae assumenda ducimus, laborum odit vitae omnis quod ipsa. Odio blanditiis laudantium eum facere.
                Nesciunt quo non labore error amet quaerat ducimus quas, placeat quasi corporis quidem nobis eum sit asperiores qui vero ex voluptas dolores est reprehenderit laborum dolorum minima. Commodi, placeat voluptatibus?
                Consequatur assumenda reprehenderit sequi provident dolore nihil omnis, modi harum iusto, corrupti eum. Magnam, labore atque nostrum doloremque, repudiandae sapiente commodi quo ratione repellat maiores veniam voluptates aliquid voluptas similique.
                Dolores amet dolorum et minima corporis, nemo, dolor eaque, accusantium enim illum obcaecati doloremque perspiciatis rerum veniam nobis deleniti atque placeat magni. A modi facere dolorum quam repellendus, dignissimos dolores?
                Libero facilis suscipit qui corrupti, quidem culpa quos eum nemo sunt rem cumque dolores debitis quis eaque provident quo assumenda iste distinctio sit dolorum incidunt sequi non. Nihil, ullam maxime?
                Enim repellendus tempore, distinctio aliquid dolorum odit id temporibus, cumque magnam voluptatibus, placeat asperiores tenetur velit corrupti voluptatem delectus nihil at labore? Soluta sit vel quae, fugiat ducimus animi dolorem.
                Assumenda consectetur officia necessitatibus unde minima rerum in non sint ut dignissimos enim eligendi blanditiis saepe nemo, dolorum error quibusdam beatae quisquam! Ipsum et tenetur, exercitationem totam sed voluptatum omnis!
                Vel quo nobis molestias numquam explicabo unde blanditiis, distinctio temporibus, accusantium consequatur officiis rem facere ratione natus illo, corporis ipsa architecto a nesciunt debitis! Incidunt in libero quos alias provident.
                Enim odio fugit aliquam placeat ex laborum officiis consequatur incidunt consectetur, exercitationem veniam error dolor? Esse, debitis voluptas. Deleniti vitae, architecto aperiam cupiditate harum quod neque provident earum. Numquam, alias!
                Temporibus, laudantium. Nemo culpa blanditiis cupiditate! Modi explicabo nostrum vitae eum quis similique unde dicta magnam necessitatibus eos sunt tempora numquam, inventore dolores facilis qui totam facere nemo impedit consectetur?
                Repudiandae excepturi modi reiciendis dolor laboriosam, aliquam numquam recusandae accusantium! Nobis reprehenderit eaque, dignissimos voluptatem quibusdam veritatis nam in eos odio et beatae consectetur velit explicabo minus sapiente. Atque, dolorem?
            </h3>
            <Button onClick={() => {navigate('/cuestionario')}}>
                Realizar test
            </Button>
        </section>
    )
}

